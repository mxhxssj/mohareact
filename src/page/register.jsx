import { useState } from "react";
import "./register.css";

export default function Register({ setPage }) {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data);
                return;
            }

            alert("Usuario registrado correctamente ");
            setPage("login");

        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">

                <h2>Crear Cuenta</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Registrarse</button>

                </form>

                <p>
                    ¿Ya tienes cuenta?{" "}
                    <span onClick={() => setPage("login")}>
            Inicia sesión
          </span>
                </p>

            </div>
        </div>
    );
}