import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../.env") });

const dbUri = process.env.CONEXION;

// CAMBIO CLAVE: Usamos createPool en lugar de createConnection
// El Pool gestiona múltiples conexiones y las reconecta automáticamente si fallan.
const db = mysql.createPool({
    uri: dbUri,
    waitForConnections: true,
    connectionLimit: 3,
    queueLimit: 0,
    enableKeepAlive: true, // Mantiene la conexión activa para evitar el ECONNRESET
    keepAliveInitialDelay: 10000
});

// En un Pool no se usa db.connect(). El Pool se conecta solo al hacer la primera consulta.
// Pero podemos verificar la conexión así:
db.getConnection((err, connection) => {
    if (err) {
        console.error(" Error de conexión con el Pool:", err.message);
        return;
    }
    console.log(" Conectado a MySQL (Filess.io) mediante Pool correctamente");
    connection.release(); // Importante: devolvemos la conexión al pool
});

export default db;