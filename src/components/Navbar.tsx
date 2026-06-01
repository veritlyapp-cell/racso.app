import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';


import racsoLogo from '../assets/logo.png';

export default function Navbar({ onOpenSurvey }: { onOpenSurvey: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar glass-panel">
            <div className="navbar-container">
                <a href="/" className="navbar-logo">
                    <img src={racsoLogo} alt="Racso Logo" className="logo-image" />
                    <span className="logo-text">Racso<span className="accent">.app</span></span>
                </a>

                <div className="navbar-links desktop-only">
                    <a href="#features" className="nav-link">Pilares</a>
                </div>

                <div className="navbar-actions desktop-only">
                    <button className="button-secondary" onClick={onOpenSurvey} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Unirse a la Beta</button>
                    <button className="button-primary play-btn" onClick={() => alert('¡Muy pronto! Da clic en "Unirse a la Beta" para tener prioridad cuando esté habilitado.')} style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Descargar</button>
                </div>

                <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mobile-menu glass-panel"
                >
                    <a href="#features" className="nav-link mobile-link" onClick={() => setIsOpen(false)}>Pilares</a>
                    <div className="mobile-actions">
                        <button className="button-secondary full-width" onClick={() => { setIsOpen(false); onOpenSurvey(); }}>Unirse a la Beta</button>
                        <button className="button-primary play-btn full-width" onClick={() => { setIsOpen(false); alert('¡Muy pronto! Da clic en "Unirse a la Beta" para tener prioridad cuando esté habilitado.'); }}>Descargar en Google Play</button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}

