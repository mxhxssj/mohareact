import "./CocheDetalle.css";

export default function CocheDetalle({ coche }) {

    if (!coche) {
        return <p>No hay coche seleccionado</p>;
    }

    return (
        <div className="detalle-container">

            <img src={coche.imagen} alt={coche.nombre} />

            <h1>{coche.nombre}</h1>

            <div className="detalle-info">

                <div className="detalle-box">
                    Marca: {coche.marca}
                </div>

                <div className="detalle-box">
                    Potencia: {coche.potencia}
                </div>

                <div className="detalle-box">
                    Velocidad: {coche.velocidad}
                </div>

            </div>

        </div>
    );
}
