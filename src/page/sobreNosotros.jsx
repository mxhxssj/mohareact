import "./sobreNosotros.css";

export default function SobreNosotros() {
    return (
        <div className="sobre-container">

            {/* HERO */}
            <section className="sobre-hero">
                <h1>Pasión por el Motor</h1>
                <p>
                    Coches, motos y rendimiento. MotorHub nace para quienes sienten
                    la velocidad, la ingeniería y el diseño como algo más que transporte.
                </p>
            </section>

            {/* SECCION 1 */}
            <section className="sobre-section">
                <img src="../../public/garage.jpg" alt="coches deportivos" />

                <div className="sobre-text">
                    <h2>El mundo del automóvil</h2>

                    <p>
                        El automóvil representa una de las mayores revoluciones de la
                        ingeniería moderna. Desde los primeros motores de combustión hasta
                        los actuales superdeportivos híbridos y eléctricos, la evolución ha
                        sido constante en potencia, seguridad y eficiencia.
                    </p>

                    <p>
                        Hoy en día los coches no solo se diseñan para moverse, sino para
                        ofrecer experiencias: aceleración, precisión en curva, aerodinámica,
                        sonido y tecnología embarcada.
                    </p>

                    <p>
                        En MotorHub reunimos modelos destacados para que puedas explorar
                        especificaciones, rendimiento y características clave de cada vehículo.
                    </p>
                </div>
            </section>

            {/* SECCION 2 */}
            <section className="sobre-section reverse">
                <img src="../../public/motos1.jpg" alt="motos deportivas" />

                <div className="sobre-text">
                    <h2>La esencia de las motos</h2>

                    <p>
                        Las motos representan la conexión más directa entre máquina y piloto.
                        Menos peso, más sensación y control total sobre cada movimiento.
                    </p>

                    <p>
                        Desde motos deportivas de circuito hasta modelos naked urbanos,
                        cada categoría ofrece una experiencia distinta basada en agilidad,
                        respuesta y carácter.
                    </p>

                    <p>
                        La cultura de la moto combina técnica, estilo y comunidad,
                        siendo uno de los mundos más apasionados dentro del motor.
                    </p>
                </div>
            </section>

            {/* SECCION 3 */}
            <section className="sobre-highlight">
                <h2>Rendimiento e ingeniería</h2>

                <p>
                    El rendimiento no es solo velocidad máxima. Es relación peso-potencia,
                    entrega de par, comportamiento dinámico y eficiencia mecánica.
                </p>

                <p>
                    La ingeniería del motor mezcla materiales avanzados, simulación,
                    electrónica y aerodinámica para lograr máquinas cada vez más precisas.
                </p>

                <p>
                    Turbos, sistemas híbridos, tracción inteligente y electrónica de control
                    han cambiado completamente cómo se diseñan y conducen los vehículos
                    actuales.
                </p>
            </section>

            {/* SECCION 4 */}
            <section className="sobre-section">
                <img src="../../public/circuito.jpg" alt="circuito" />

                <div className="sobre-text">
                    <h2>Cultura y competición</h2>

                    <p>
                        El mundo del motor está profundamente ligado a la competición:
                        Fórmula 1, MotoGP, rally, resistencia y categorías GT impulsan la
                        innovación tecnológica.
                    </p>

                    <p>
                        Muchas de las tecnologías que hoy están en coches de calle nacieron
                        en circuitos y entornos de competición extrema.
                    </p>

                    <p>
                        La competición no solo busca ganar, sino empujar los límites de lo
                        posible en mecánica y diseño.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="sobre-cta">
                <h2>Explora el universo MotorHub</h2>
                <p>
                    Descubre modelos, compara prestaciones y sumérgete en el mundo
                    de los coches y las motos de alto rendimiento.
                </p>
            </section>

        </div>
    );
}


