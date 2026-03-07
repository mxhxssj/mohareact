import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargamos el .env por si acaso usas variables ahí también
dotenv.config({ path: path.join(__dirname, "../../.env") });

// Definimos la URI (puedes ponerla en el .env como DATABASE_URL)
const dbUri = process.env.CONEXION;

// Para usar una URI, se pasa directamente como primer argumento
const db = mysql.createConnection(dbUri);

db.connect((err) => {
    if (err) {
        console.error(" Error de conexión con URI:", err.message);
        return;
    }
    console.log(" Conectado a MySQL (Filess.io) mediante URI correctamente");
});

export default db;