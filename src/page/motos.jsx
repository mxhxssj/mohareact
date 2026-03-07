import { useEffect, useState } from "react";
import MotoCard from "../componentes/MotoCard";
import "./motos.css";

export default function Motos({ setPage, setMotoSeleccionada }) {

    const [motos, setMotos] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [marca, setMarca] = useState("todas");

    useEffect(() => {
        fetch("http://localhost:3001/motos")
            .then(res => res.json())
            .then(data => setMotos(data))
            .catch(err => console.error("Error cargando motos:", err));
    }, []);

    const marcas = ["todas", ...new Set(motos.map(m => m.marca))];

    const motosFiltradas = motos.filter(m =>
        m.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (marca === "todas" || m.marca === marca)
    );

    return (
        <div className="motos-container">

            <div className="motos-header">
                <h1>Catálogo de Motos</h1>
                <p>Superbikes y motos deportivas</p>
            </div>

            <div className="motos-filtros">
                <input
                    placeholder="Buscar moto..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />

                <select value={marca} onChange={e => setMarca(e.target.value)}>
                    {marcas.map(m => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
            </div>

            <p className="motos-count">
                Resultados: {motosFiltradas.length}
            </p>

            <div className="motos-grid">
                {motosFiltradas.map(m => (
                    <MotoCard
                        key={m.id}
                        moto={m}
                        setPage={setPage}
                        setMotoSeleccionada={setMotoSeleccionada}
                    />
                ))}
            </div>

        </div>
    );
}

