import { useState } from "react";
import Modal from "./Modal";

export default function MotoCard({ moto }) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="moto-card">
                <img src={moto.img} alt={moto.nombre} />

                <div className="moto-info">
                    <h3>{moto.nombre}</h3>

                    <div className="badges">
                        <span>{moto.marca}</span>
                        <span>{moto.potencia}</span>
                        <span>{moto.velocidad}</span>
                    </div>

                    <button onClick={() => setOpen(true)}>
                        Ver más
                    </button>
                </div>
            </div>

            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
            >
                <div className="modal-moto">

                    <img
                        src={moto.img}
                        alt={moto.nombre}
                        className="modal-moto-img"
                    />

                    <div className="modal-moto-info">
                        <h2>{moto.nombre}</h2>

                        <div className="modal-badges">
                            <span>{moto.marca}</span>
                            <span>{moto.potencia}</span>
                            <span>{moto.velocidad}</span>
                        </div>

                        <p>
                            {moto.descripcion || "Moto deportiva de alto rendimiento con diseño agresivo y tecnología avanzada."}
                        </p>

                        <button className="modal-action">
                            Contactar
                        </button>
                    </div>

                </div>
            </Modal>
        </>
    );
}