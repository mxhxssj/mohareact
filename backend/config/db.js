import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const dbUri = process.env.CONEXION;

const db = mysql.createConnection(dbUri);

db.connect((err) => {
    if (err) {
        console.error(" Error de conexión con URI:", err.message);
        return;
    }
    console.log(" Conectado a MySQL (Filess.io) mediante URI correctamente");
});

export default db;