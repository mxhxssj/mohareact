import express from "express";
import cors from "cors";
import db from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3001 ;
const SECRET_KEY = "motorhub_secret_key";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../dist")));



app.get("/api/test", (req, res) => {
    res.send("API MotorHub funcionando");
});

app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) {
            return res.status(500).json("Error en la base de datos");
        }
        res.json("Base de datos conectada correctamente");
    });
});

app.post("/register", async (req, res) => {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        return res.status(400).json("Todos los campos son obligatorios");
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO user (nombre, email, password) VALUES (?, ?, ?)";
        db.query(sql, [nombre, email, hashedPassword], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json("El usuario ya existe o error en BD");
            }
            res.status(201).json("Usuario registrado correctamente");
        });
    } catch (error) {
        res.status(500).json("Error del servidor");
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) {
            console.error("Error en DB durante login:", err.message);
            return res.status(500).json("Error de conexión con la base de datos");
        }
        if (result.length === 0) return res.status(404).json("Usuario no encontrado");

        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json("Contraseña incorrecta");

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: "2h" }
        );
        res.json({ message: "Login correcto ", token });
    });
});

app.post("/alquilar", (req, res) => {
    const { vehiculo_id, tipo, fecha_inicio, fecha_fin, total } = req.body;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json("No autorizado - Token faltante");
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user_id = decoded.id;
        const sql = `INSERT INTO alquileres (user_id, vehiculo_id, tipo, fecha_inicio, fecha_fin, total) VALUES (?, ?, ?, ?, ?, ?)`;

        db.query(sql, [user_id, vehiculo_id, tipo, fecha_inicio, fecha_fin, total], (err) => {
            if (err) return res.status(500).json("Error al crear alquiler");
            res.json("Alquiler realizado correctamente");
        });
    } catch (error) {
        return res.status(401).json("Token inválido o expirado");
    }
});

app.get("/mis-alquileres", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json("No autorizado");

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const sql = `
            SELECT
                a.*,
                CASE
                    WHEN a.tipo = 'coche' THEN c.nombre
                    WHEN a.tipo = 'moto' THEN m.nombre
                    END AS vehiculo_nombre,

                CASE
                    WHEN a.tipo = 'coche' THEN c.imagen
                    WHEN a.tipo = 'moto' THEN m.imagen
                    END AS vehiculo_imagen

            FROM alquileres a
                     LEFT JOIN coches c ON a.vehiculo_id = c.id AND a.tipo = 'coche'
                     LEFT JOIN motos m ON a.vehiculo_id = m.id AND a.tipo = 'moto'
            WHERE a.user_id = ?
        `;

        db.query(sql, [decoded.id], (err, result) => {
            if (err) return res.status(500).json("Error al obtener alquileres");
            res.json(result);
        });
    } catch (error) {
        return res.status(401).json("Token inválido");
    }
});

app.get("/motos", (req, res) => {
    db.query("SELECT * FROM motos", (err, results) => {
        if (err) return res.status(500).json({ error: "Error obteniendo motos" });
        res.json(results);
    });
});

app.get("/coches", (req, res) => {
    db.query("SELECT * FROM coches", (err, results) => {
        if (err) return res.status(500).json({ error: "Error obteniendo coches" });
        res.json(results);
    });
});


app.get("/fechas-ocupadas/:vehiculo_id", (req, res) => {

    const vehiculo_id = req.params.vehiculo_id;

    const sql = `
        SELECT fecha_inicio, fecha_fin
        FROM alquileres
        WHERE vehiculo_id = ?
    `;

    db.query(sql, [vehiculo_id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json("Error cargando fechas ocupadas");
        }

        res.json(result);

    });

});

app.get('/:path*', (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});


app.listen(PORT, () => {
    console.log(` Servidor MotorHub corriendo en: http://localhost:${PORT}`);
});