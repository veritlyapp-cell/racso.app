import { motion } from 'framer-motion';
import { PlayCircle, Sparkles, Star } from 'lucide-react';
import './Hero.css';

import appMenu from '../assets/app_7.38.10_PM_2.jpeg';

export default function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-container">

                {/* Left Side Content */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="badge glass-panel"
                    >
                        <Sparkles size={16} className="badge-icon" />
                        <span>Impulsado por Gemini</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hero-title"
                    >
                        Tu Coach de Empleabilidad con <span className="text-gradient">Inteligencia Artificial</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        Potencia tu currículum, domina tus entrevistas con nuestro Simulador STAR y consigue el trabajo de tus sueños en tiempo récord.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="hero-actions"
                    >
                        <button className="button-primary play-btn">
                            <PlayCircle size={24} />
                            Descargar en Google Play
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="hero-trust"
                    >
                        <div className="stars">
                            <Star fill="var(--neon-green)" color="var(--neon-green)" size={16} />
                            <Star fill="var(--neon-green)" color="var(--neon-green)" size={16} />
                            <Star fill="var(--neon-green)" color="var(--neon-green)" size={16} />
                            <Star fill="var(--neon-green)" color="var(--neon-green)" size={16} />
                            <Star fill="var(--neon-green)" color="var(--neon-green)" size={16} />
                        </div>
                        <p>Más de 10,000 profesionales ya mejoraron su perfil</p>
                    </motion.div>
                </div>

                {/* Right Side Visual/3D or Glass App Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="hero-visual"
                >
                    <div className="app-mockup glass-panel" style={{ padding: '0.5rem' }}>
                        <div className="mockup-header" style={{ paddingLeft: '1rem', paddingTop: '0.5rem', marginBottom: '0.5rem' }}>
                            <div className="mockup-dot red"></div>
                            <div className="mockup-dot yellow"></div>
                            <div className="mockup-dot green"></div>
                        </div>
                        <div className="mockup-scan" style={{ padding: '0', display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '20px' }}>
                            <img src={appMenu} alt="Racso App" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                    {/* Glow effects */}
                    <div className="glow-orb green"></div>
                    <div className="glow-orb violet"></div>
                </motion.div>

            </div>
        </section>
    );
}


