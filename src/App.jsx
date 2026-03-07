import { useState, useEffect } from "react";
import Navbar from "./componentes/layout/navbar";
import Footer from "./componentes/layout/footer";

import Inicio from "./page/inicio";
import Coches from "./page/coches";
import Motos from "./page/motos";
import SobreNosotros from "./page/sobreNosotros";
import Contacto from "./page/contactanos";
import CocheDetalle from "./page/CocheDetalle";
import MotoDetalle from "./page/MotoDetalle";
import MisAlquileres from "./page/MisAlquileres";

import Login from "./page/login";
import Register from "./page/register";

export default function App() {
    const [page, setPage] = useState("inicio");
    const [cocheSeleccionado, setCocheSeleccionado] = useState(null);
    const [motoSeleccionada, setMotoSeleccionada] = useState(null);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogged(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLogged(false);
        setPage("inicio");
    };

    return (
        <div>
            <Navbar
                setPage={setPage}
                isLogged={isLogged}
                handleLogout={handleLogout}
            />

            {page === "inicio" && <Inicio />}

            {!isLogged && page === "login" && (
                <Login setPage={setPage} setIsLogged={setIsLogged} />
            )}

            {!isLogged && page === "register" && (
                <Register setPage={setPage} />
            )}

            {isLogged && page === "coches" && (
                <Coches
                    setPage={setPage}
                    setCocheSeleccionado={setCocheSeleccionado}
                />
            )}

            {isLogged && page === "motos" && (
                <Motos
                    setPage={setPage}
                    setMotoSeleccionada={setMotoSeleccionada}
                />
            )}

            {isLogged && page === "sobre" && <SobreNosotros />}
            {isLogged && page === "contacto" && <Contacto />}
            {isLogged && page === "mis-alquileres" && <MisAlquileres />}

            {isLogged && page === "cocheDetalle" && (
                <CocheDetalle coche={cocheSeleccionado} />
            )}

            {isLogged && page === "motoDetalle" && (
                <MotoDetalle moto={motoSeleccionada} />
            )}

            <Footer />
        </div>
    );
}
