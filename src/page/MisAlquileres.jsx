import { useEffect, useState } from "react";
import "./MisAlquileres.css";

export default function MisAlquileres() {

    const [alquileres, setAlquileres] = useState([]);

    useEffect(() => {

        const fetchAlquileres = async () => {

            const token = localStorage.getItem("token");

            try {

                const response = await fetch("/mis-alquileres", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();
                setAlquileres(data);

            } catch (error) {
                console.error("Error cargando alquileres", error);
            }

        };

        fetchAlquileres();

    }, []);

    return (
        <div className="mis-alquileres-container">

            <h2>Mis Alquileres</h2>

            <div className="alquiler-grid">

                {alquileres.map(a => {

                    const nombre = a.coche_nombre || a.moto_nombre;
                    const imagen = a.coche_imagen || a.moto_imagen;

                    return (
                        <div key={a.id} className="alquiler-card">

                            {imagen && (
                                <img
                                    src={imagen}
                                    alt={nombre}
                                    className="alquiler-img"
                                />
                            )}

                            <div className="alquiler-info">

                                <h3>{nombre}</h3>

                                <p>
                                    <strong>Desde:</strong>{" "}
                                    {new Date(a.fecha_inicio).toLocaleDateString()}
                                </p>

                                <p>
                                    <strong>Hasta:</strong>{" "}
                                    {new Date(a.fecha_fin).toLocaleDateString()}
                                </p>

                                <p className="precio-total">
                                    Total: {a.total} €
                                </p>

                            </div>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}