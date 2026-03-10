import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <span className="logo-text">Racso<span className="accent">.app</span></span>
                        <p className="footer-description">
                            Tu coach de empleabilidad con Inteligencia Artificial.
                        </p>
                    </div>
                    <div className="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            <li>
                                <a href="/politica-de-privacidad.html" target="_blank" rel="noopener noreferrer">
                                    Política de Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="/terminos-y-condiciones.html" target="_blank" rel="noopener noreferrer">
                                    Términos y Condiciones
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Racso.app operada por Relié Labs. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
