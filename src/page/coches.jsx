import { useEffect, useState } from "react";
import "./coches.css";
import CocheCard from "../componentes/CocheCard";

export default function Coches({ setPage, setCocheSeleccionado }) {

    const [coches, setCoches] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [marca, setMarca] = useState("todas");

    useEffect(() => {
        fetch("http://localhost:3001/coches")
            .then(res => res.json())
            .then(data => setCoches(data))
            .catch(err => console.error("Error cargando coches:", err));
    }, []);

    const marcas = ["todas", ...new Set(coches.map(c => c.marca))];

    const cochesFiltrados = coches.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (marca === "todas" || c.marca === marca)
    );

    return (
        <div className="coches-container">

            <div className="coches-header">
                <h1>Catálogo de Coches</h1>
                <p>Explora modelos, potencia y velocidad máxima</p>
            </div>

            <div className="coches-filtros">

                <input
                    type="text"
                    placeholder="Buscar modelo..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />

                <select
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                >
                    {marcas.map(m => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>

            </div>

            <p className="coches-count">
                Resultados: {cochesFiltrados.length}
            </p>

            <div className="coches-grid">
                {cochesFiltrados.map(c => (
                    <CocheCard
                        key={c.id}
                        coche={c}
                        setPage={setPage}
                        setCocheSeleccionado={setCocheSeleccionado}
                    />
                ))}
            </div>

        </div>
    );
}


