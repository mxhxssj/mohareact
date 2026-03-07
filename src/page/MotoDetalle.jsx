import "./MotoDetalle.css";

export default function MotoDetalle({ moto, setPage }) {

    if (!moto) return <p>No hay moto seleccionada</p>;

    return (
        <div className="moto-detalle-container">

            <button
                className="volver-btn"
                onClick={() => setPage("motos")}
            >
                ← Volver
            </button>

            <div className="moto-detalle-card">

                <img
                    src={moto.imagen}
                    alt={moto.nombre}
                    className="moto-detalle-img"
                />

                <div className="moto-detalle-info">
                    <h1>{moto.nombre}</h1>

                    <div className="detalle-badges">
                        <span>{moto.marca}</span>
                        <span>{moto.potencia}</span>
                        <span>{moto.velocidad}</span>
                    </div>

                    <p>
                        {moto.descripcion ||
                            "Moto deportiva diseñada para máximo rendimiento y experiencia de conducción superior."}
                    </p>

                    <button className="contactar-btn">
                        Contactar
                    </button>
                </div>

            </div>
        </div>
    );
}