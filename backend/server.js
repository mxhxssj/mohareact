import express from "express";
import cors from "cors";
import db from "./config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const SECRET_KEY = "motorhub_secret_key";

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== RUTA TEST =====
app.get("/", (req, res) => {
    res.send("🚀 API MotorHub funcionando");
});

app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err) => {
        if (err) {
            return res.status(500).json("Error en la base de datos");
        }
        res.json("Base de datos conectada correctamente ");
    });
});


// =========================
// ===== REGISTER =========
// =========================
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

            res.status(201).json("Usuario registrado correctamente ");
        });

    } catch (error) {
        res.status(500).json("Error del servidor");
    }
});


// =========================
// ===== LOGIN ============
// =========================
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json("Error del servidor");

        if (result.length === 0) {
            return res.status(404).json("Usuario no encontrado");
        }

        const user = result[0];

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json("Contraseña incorrecta");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login correcto ✅",
            token
        });
    });
});


// =========================
// ===== ALQUILAR =========
// =========================
app.post("/alquilar", (req, res) => {
    const { vehiculo_id, tipo, fecha_inicio, fecha_fin, total } = req.body;

    // 🔥 VALIDACIÓN EXTRA
    if (!vehiculo_id || !tipo || !fecha_inicio || !fecha_fin) {
        return res.status(400).json("Faltan datos del alquiler");
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json("No autorizado - Token faltante");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user_id = decoded.id;

        const sql = `
            INSERT INTO alquileres
                (user_id, vehiculo_id, tipo, fecha_inicio, fecha_fin, total)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(
            sql,
            [user_id, vehiculo_id, tipo, fecha_inicio, fecha_fin, total],
            (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json("Error al crear alquiler");
                }

                res.json("Alquiler realizado correctamente ");
            }
        );

    } catch (error) {
        console.log("Error JWT:", error.message);
        return res.status(401).json("Token inválido o expirado");
    }
});

app.get("/mis-alquileres", (req, res) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json("No autorizado");
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, SECRET_KEY);
        const user_id = decoded.id;

        const sql = `
        SELECT 
        a.*,
        c.nombre AS coche_nombre,
        c.imagen AS coche_imagen,
        m.nombre AS moto_nombre,
        m.imagen AS moto_imagen
        FROM alquileres a
        LEFT JOIN coches c ON a.vehiculo_id = c.id
        LEFT JOIN motos m ON a.vehiculo_id = m.id
        WHERE a.user_id = ?
        `;

        db.query(sql, [user_id], (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json("Error al obtener alquileres");
            }

            res.json(result);

        });

    } catch (error) {
        return res.status(401).json("Token inválido");
    }
});


app.get("/fechas-ocupadas/:vehiculo_id", (req, res) => {

    const { vehiculo_id } = req.params;

    const sql = `
        SELECT fecha_inicio, fecha_fin
        FROM alquileres
        WHERE vehiculo_id = ?
    `;

    db.query(sql, [vehiculo_id], (err, result) => {
        if (err) {
            return res.status(500).json("Error al obtener fechas");
        }

        res.json(result);
    });
});

app.get("/motos", (req, res) => {

    db.query("SELECT * FROM motos", (err, results) => {

        if (err) {
            console.error("Error en motos:", err);
            return res.status(500).json({ error: "Error obteniendo motos" });
        }

        res.json(results);
    });

});

app.get("/coches", (req, res) => {

    db.query("SELECT * FROM coches", (err, results) => {

        if (err) {
            console.error("Error en coches:", err);
            return res.status(500).json({ error: "Error obteniendo coches" });
        }

        res.json(results);
    });

});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});


const path = require("path");

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
});