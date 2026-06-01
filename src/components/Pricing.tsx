import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';
import './Pricing.css';

const features = [
    {
        name: 'Scanner CV',
        free: 'Máximo 1 CV guardado',
        premium: 'Hasta 3 versiones de CV distintas',
        highlight: false
    },
    {
        name: 'Perfiles de Puesto (Match IA)',
        free: '2 Matches (Análisis) por semana',
        premium: '5 Matches por día',
        highlight: false
    },
    {
        name: 'Formatos Aceptados (JD)',
        free: 'Solo PDF y Word',
        premium: 'PDF, Word y Capturas de Pantalla (Racso Vision)',
        highlight: true
    },
    {
        name: 'Seguimiento ATS (Kanban)',
        free: false, // Will render as 'Bloqueado'
        premium: 'Desbloqueado (Guarda y rastrea postulaciones)',
        highlight: false
    },
    {
        name: 'Coach STAR (Entrevistas Vía Voz)',
        free: 'Preguntas generales (Sin contexto de vacante)',
        premium: 'Simulación hiper-personalizada usando la vacante real guardada',
        highlight: true
    },
    {
        name: 'Calendario Inteligente',
        free: false,
        premium: 'Desbloqueado (Vinculado al ATS)',
        highlight: false
    },
    {
        name: 'Notificaciones y Alertas',
        free: false,
        premium: 'Alertas Push Automáticas 1 hora antes',
        highlight: false
    },
    {
        name: 'Día de Entrevista (Cápsulas de Poder)',
        free: false,
        premium: 'Desbloqueado (Tips tácticos extraídos de cruzar tu CV contra el JD horas antes de la entrevista vital)',
        highlight: true
    }
];

export default function Pricing({ onOpenSurvey }: { onOpenSurvey: () => void }) {
    return (
        <section id="premium" className="pricing-section">
            <div className="pricing-container">
                <div className="pricing-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        Invierte en tu <span className="text-gradient">Futuro Profesional</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-subtitle"
                        style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}
                    >
                        Da el siguiente paso en tu carrera. Comienza gratis o desata todo el poder de Racso AI para multiplicar tus entrevistas.
                    </motion.p>
                </div>

                <div className="pricing-table-wrapper">
                    <table className="pricing-table">
                        <thead>
                            <tr>
                                <th className="feature-column">Funcionalidad (Pilar)</th>
                                <th className="plan-column base-plan">
                                    <div className="plan-header">
                                        <h3>🆓 Plan Base</h3>
                                        <p className="plan-price">Gratis</p>
                                        <button className="button-secondary plan-btn" onClick={onOpenSurvey}>Empezar Gratis</button>
                                    </div>
                                </th>
                                <th className="plan-column premium-plan">
                                    <div className="plan-header glass-panel highlight-header">
                                        <div className="popular-badge"><Sparkles size={14} /> Más Popular</div>
                                        <h3>💎 Plan Premium</h3>
                                        <p className="plan-price text-gradient">S/. 19.90<span>/mes</span></p>
                                        <button className="button-primary plan-btn" onClick={onOpenSurvey}>Obtener Premium</button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, idx) => (
                                <motion.tr
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    viewport={{ once: true }}
                                >
                                    <td className="feature-name">{feature.name}</td>
                                    <td className="plan-value base-value" data-label="Plan Base">
                                        {feature.free === false ? (
                                            <span className="locked"><X size={16} /> Bloqueado</span>
                                        ) : (
                                            <span className="text-free">{feature.free}</span>
                                        )}
                                    </td>
                                    <td className={`plan-value premium-value ${feature.highlight ? 'highlight-text' : ''}`} data-label="Plan Premium">
                                        <Check size={18} className="check-icon" />
                                        <span>{feature.premium}</span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
