import { useState } from "react";
import "./navbar.css";

export default function Navbar({ setPage, isLogged, handleLogout }) {

    const [menuOpen, setMenuOpen] = useState(false);

    function NavButton({ name, label }) {
        return (
            <button
                className="nav-btn"
                onClick={() => {
                    setPage(name);
                    setMenuOpen(false);
                }}
            >
                {label}
            </button>
        );
    }

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                Motor<span>Hub</span>
            </div>

            <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
                <NavButton name="inicio" label="Inicio" />

                {isLogged && (
                    <>
                        <NavButton name="coches" label="Coches" />
                        <NavButton name="motos" label="Motos" />
                        <NavButton name="sobre" label="Sobre Nosotros" />
                        <NavButton name="contacto" label="Contacto" />
                        <NavButton name="mis-alquileres" label="Mis Alquileres" />
                        <button className="nav-btn" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </>
                )}

                {!isLogged && (
                    <>
                        <NavButton name="login" label="Login" />
                        <NavButton name="register" label="Registrarse" />
                    </>
                )}
            </div>

            <div
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

        </nav>
    );
}
