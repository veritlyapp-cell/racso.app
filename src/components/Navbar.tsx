import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Navbar.css';


import racsoLogo from '../assets/logo.png';

export default function Navbar() {
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
                    <a href="#premium" className="nav-link">Premium</a>
                    <a href="#testimonials" className="nav-link">Testimonios</a>
                </div>

                <div className="navbar-actions desktop-only">
                    <button className="button-primary play-btn">Descargar en Google Play</button>
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
                    <a href="#premium" className="nav-link mobile-link" onClick={() => setIsOpen(false)}>Premium</a>
                    <a href="#testimonials" className="nav-link mobile-link" onClick={() => setIsOpen(false)}>Testimonios</a>
                    <div className="mobile-actions">
                        <button className="button-primary play-btn full-width">Descargar en Google Play</button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
