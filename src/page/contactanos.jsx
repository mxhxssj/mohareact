import { useState } from "react";
import "./contactanos.css";

export default function Contactanos() {
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault(); // Ahora sí lo usamos, pero enviaremos los datos manualmente

        const form = e.target;
        const data = new FormData(form); // Captura todos los campos (name, email, message)

        try {
            const response = await fetch("https://formspree.io/f/mlgwnwyo", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setEnviado(true);
                form.reset(); // Limpia el formulario después de enviar
            } else {
                setError(true);
            }
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className="contacto-container">
            <h1 className="contacto-title">Contáctanos</h1>

            <form
                className="contacto-form"
                onSubmit={handleSubmit}
            >
                <label htmlFor="full-name">Nombre</label>
                <input type="text" name="name" id="full-name" required />

                <label htmlFor="email-address">Email</label>
                <input type="email" name="email" id="email-address" required />

                <label htmlFor="message">Mensaje</label>
                <textarea name="message" id="message" required />

                <button type="submit">Enviar mensaje</button>

                {enviado && (
                    <p className="contacto-ok">
                        ¡Gracias! Tu mensaje ha sido enviado correctamente.
                    </p>
                )}

                {error && (
                    <p className="contacto-error" style={{color: 'red'}}>
                        Hubo un error al enviar. Inténtalo de nuevo.
                    </p>
                )}
            </form>
        </div>
    );
}
