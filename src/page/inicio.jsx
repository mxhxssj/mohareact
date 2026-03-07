import "./inicio.css";

export default function Inicio() {
    return (
        <div className="inicio">

            {/* HERO */}
            <section className="inicio-hero">
                <div className="hero-content">
                    <h1>Motor<span>Hub</span></h1>
                    <p>
                        Explora coches y motos con fichas técnicas, comparativas
                        y datos de rendimiento en una sola plataforma.
                    </p>

                    <div className="hero-buttons">
                        <button>Ver Coches</button>
                        <button className="btn-outline">Ver Motos</button>
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="inicio-features">

                <div className="feature">
                    <h3> Catálogo de coches</h3>
                    <p>
                        Modelos deportivos, eléctricos y clásicos con especificaciones
                        detalladas de potencia, velocidad y rendimiento.
                    </p>
                </div>

                <div className="feature">
                    <h3> Catálogo de motos</h3>
                    <p>
                        Deportivas, naked y touring con datos técnicos y comparativas
                        visuales para elegir mejor.
                    </p>
                </div>

                <div className="feature">
                    <h3> Filtros inteligentes</h3>
                    <p>
                        Busca por marca, modelo o categoría y encuentra lo que necesitas
                        en segundos.
                    </p>
                </div>

            </section>

            {/* GRID DE SECCIONES */}
            <section className="inicio-grid">

                <div className="inicio-card">
                    <h3>Coches</h3>
                    <p>Modelos y fichas técnicas completas</p>
                    <span>Explorar →</span>
                </div>

                <div className="inicio-card">
                    <h3>Motos</h3>
                    <p>Deportivas, naked y más</p>
                    <span>Explorar →</span>
                </div>

                <div className="inicio-card">
                    <h3>Comparador</h3>
                    <p>Comparativas rápidas</p>
                    <span>Probar →</span>
                </div>

                <div className="inicio-card">
                    <h3>Noticias</h3>
                    <p>Novedades del motor</p>
                    <span>Leer →</span>
                </div>

            </section>

            {/* DESTACADO */}
            <section className="inicio-highlight">
                <div className="highlight-text">
                    <h2>Datos reales, vista clara</h2>
                    <p>
                        MotorHub presenta la información técnica de forma estructurada
                        y visual para que puedas comparar y explorar vehículos sin
                        complicaciones.
                    </p>

                    <p>
                        Diseño moderno, componentes reutilizables y navegación clara.
                    </p>
                </div>

                <div className="highlight-box">
                    <h3>Top rendimiento</h3>
                    <p>+350 km/h</p>
                    <span>Velocidades máximas registradas</span>
                </div>
            </section>

            {/* STATS */}
            <section className="inicio-stats">

                <div className="inicio-stat">
                    <h2>120+</h2>
                    <p>Modelos</p>
                </div>

                <div className="inicio-stat">
                    <h2>40+</h2>
                    <p>Marcas</p>
                </div>

                <div className="inicio-stat">
                    <h2>300+</h2>
                    <p>Fichas técnicas</p>
                </div>

                <div className="inicio-stat">
                    <h2>24/7</h2>
                    <p>Actualización</p>
                </div>

            </section>



        </div>
    );
}



