import { useState } from "react";
import "./login.css";

export default function Login({ setPage, setIsLogged }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data);
                return;
            }

            localStorage.setItem("token", data.token);

            setIsLogged(true);
            setPage("inicio");

        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">

                <h2>Iniciar Sesión</h2>

                <form onSubmit={handleSubmit}>

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

                    <button type="submit">Entrar</button>

                </form>

                <p>
                    ¿No tienes cuenta?{" "}
                    <span onClick={() => setPage("register")}>
            Regístrate
          </span>
                </p>

            </div>
        </div>
    );
}