import { useState, useEffect } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CocheCard({ coche }) {

    const [open, setOpen] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const [fechasOcupadas, setFechasOcupadas] = useState([]);

    useEffect(() => {
        if (!open) return;

        const fetchFechas = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/fechas-ocupadas/${coche.id}`
                );

                const data = await response.json();
                setFechasOcupadas(data);
            } catch (error) {
                console.log("Error cargando fechas ocupadas");
            }
        };

        fetchFechas();
    }, [open, coche.id]);

    const fechasBloqueadas = () => {
        let fechas = [];

        fechasOcupadas.forEach(rango => {
            let inicio = new Date(rango.fecha_inicio);
            let fin = new Date(rango.fecha_fin);

            for (
                let d = new Date(inicio);
                d <= fin;
                d.setDate(d.getDate() + 1)
            ) {
                fechas.push(new Date(d));
            }
        });

        return fechas;
    };

    const calcularDias = () => {
        if (!fechaInicio || !fechaFin) return 0;

        const diferencia = fechaFin - fechaInicio;
        const dias = diferencia / (1000 * 60 * 60 * 24);

        return dias > 0 ? dias : 0;
    };

    const total = calcularDias() * coche.precio;

    const handleAlquiler = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión");
            return;
        }

        if (!fechaInicio || !fechaFin) {
            alert("Debes seleccionar las fechas");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/alquilar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehiculo_id: coche.id,
                    tipo: "coche",
                    fecha_inicio: fechaInicio.toISOString().split("T")[0],
                    fecha_fin: fechaFin.toISOString().split("T")[0],
                    total: total
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data);
                return;
            }

            alert("Vehículo alquilado correctamente ");

            // Reset
            setFechaInicio(null);
            setFechaFin(null);
            setMostrarFormulario(false);
            setOpen(false);

        } catch (error) {
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <>
            <div className="coche-card">
                <img src={coche.imagen} alt={coche.nombre} />
                <div className="coche-info">
                    <h3>{coche.nombre}</h3>
                    <button onClick={() => setOpen(true)}>
                        Ver más
                    </button>
                </div>
            </div>

            <Modal
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                    setMostrarFormulario(false);
                }}
            >
                <div className="modal-car">

                    <img
                        src={coche.img}
                        alt={coche.nombre}
                        className="modal-car-img"
                    />

                    <div className="modal-car-info">
                        <h2>{coche.nombre}</h2>

                        <div className="modal-badges">
                            <span>{coche.marca}</span>
                            <span>{coche.potencia}</span>
                            <span>{coche.velocidad}</span>
                        </div>

                        <p className="modal-description">
                            {coche.descripcion ||
                                "Modelo deportivo de alto rendimiento con diseño aerodinámico y tecnología avanzada."}
                        </p>

                        {!mostrarFormulario && (
                            <button
                                className="modal-action"
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Alquilar
                            </button>
                        )}

                        {mostrarFormulario && (
                            <div className="alquiler-form">
                                <h4>Formulario de alquiler</h4>

                                <label>Fecha inicio:</label>
                                <DatePicker
                                    selected={fechaInicio}
                                    onChange={(date) => setFechaInicio(date)}
                                    excludeDates={fechasBloqueadas()}
                                    minDate={new Date()}
                                    dateFormat="yyyy-MM-dd"
                                />

                                <label>Fecha fin:</label>
                                <DatePicker
                                    selected={fechaFin}
                                    onChange={(date) => setFechaFin(date)}
                                    excludeDates={fechasBloqueadas()}
                                    minDate={fechaInicio || new Date()}
                                    dateFormat="yyyy-MM-dd"
                                />

                                <p style={{ marginTop: "10px" }}>
                                    Precio por día: {coche.precio} €
                                </p>

                                <p>
                                    Total: <strong>{total} €</strong>
                                </p>

                                <button onClick={handleAlquiler}>
                                    Confirmar Alquiler
                                </button>

                                <button
                                    onClick={() => setMostrarFormulario(false)}
                                    style={{ background: "gray", marginTop: "5px" }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}

                    </div>

                </div>
            </Modal>
        </>
    );
}