import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "motorhub"
});

db.connect((err) => {
    if (err) {
        console.error(" Error de conexión:", err);
        return;
    }
    console.log("✅ Conectado a MySQL");
});

export default db;