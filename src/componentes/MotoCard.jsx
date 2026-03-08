import { useState, useEffect } from "react";
import Modal from "./Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MotoCard({ moto }) {

    const [open, setOpen] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    const [fechasOcupadas, setFechasOcupadas] = useState([]);

    // Cargar fechas ocupadas
    useEffect(() => {
        if (!open) return;

        const fetchFechas = async () => {
            try {
                const response = await fetch(
                    `/fechas-ocupadas/${moto.id}`
                );

                const data = await response.json();
                setFechasOcupadas(data);
            } catch (error) {
                console.log("Error cargando fechas ocupadas");
            }
        };

        fetchFechas();
    }, [open, moto.id]);

    // Convertir rangos a fechas bloqueadas
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

    const total = calcularDias() * moto.precio;

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
            const response = await fetch("/alquilar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    vehiculo_id: moto.id,
                    tipo: "moto",
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

            alert("Moto alquilada correctamente ");

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
            <div className="moto-card">
                <img src={moto.imagen} alt={moto.nombre} />
                <div className="moto-info">
                    <h3>{moto.nombre}</h3>
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
                        src={moto.imagen}
                        alt={moto.nombre}
                        className="modal-car-img"
                    />

                    <div className="modal-car-info">
                        <h2>{moto.nombre}</h2>

                        <div className="modal-badges">
                            <span>{moto.marca}</span>
                            <span>{moto.potencia}</span>
                            <span>{moto.velocidad}</span>
                        </div>

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
                                />

                                <label>Fecha fin:</label>
                                <DatePicker
                                    selected={fechaFin}
                                    onChange={(date) => setFechaFin(date)}
                                    excludeDates={fechasBloqueadas()}
                                    minDate={fechaInicio || new Date()}
                                />

                                <p>Precio por día: {moto.precio} €</p>
                                <p>Total: <strong>{total} €</strong></p>

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

