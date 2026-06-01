import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Send, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import './ConversationalForm.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

interface ConversationalFormProps {
  onClose?: () => void;
}

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBkfdokksIl49oN5zRAHqy-3XZMsrF2cTyKSTiYHARNhP8wwqwuUzyuyDrNk6dedvs/exec';

export default function ConversationalForm({ onClose }: ConversationalFormProps) {
  const [step, setStep] = useState<number>(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  // Form State
  const [vacantes, setVacantes] = useState<string>('');
  const [entrevistas, setEntrevistas] = useState<string>('');
  const [barrera, setBarrera] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    sendBotMessage(
      'Hola, soy Racso. He ayudado a muchos profesionales a dejar de ser invisibles para los reclutadores y conseguir entrevistas. Estoy seleccionando un grupo exclusivo para probar la nueva app de Racso: tu coach de empleabilidad con IA que optimizará tus postulaciones y multiplicará tus oportunidades. ¿Me cuentas un poco sobre tu situación actual?'
    );
  }, []);

  const sendBotMessage = (text: string) => {
    setIsTyping(true);
    const typingDelay = Math.min(800 + text.length * 5, 2000); // Dynamic reading delay
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text
        }
      ]);
    }, typingDelay);
  };

  const handleUserResponse = (text: string, value: string, nextStep: number) => {
    // 1. Add user message to chat
    setMessages(prev => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text
      }
    ]);
    
    // Save state based on current step
    if (step === 0) {
      // Welcome transition
    } else if (step === 1) {
      setVacantes(value);
    } else if (step === 2) {
      setEntrevistas(value);
    } else if (step === 3) {
      setBarrera(value);
    }

    setStep(nextStep);

    // 2. Trigger next bot question
    if (nextStep === 1) {
      sendBotMessage('¿Cuántas vacantes has postulado en la última semana?');
    } else if (nextStep === 2) {
      sendBotMessage('¿Cuántas llamadas de entrevista has recibido en este mismo periodo?');
    } else if (nextStep === 3) {
      sendBotMessage('Seamos honestos, ¿cuál sientes que es tu mayor barrera hoy?');
    } else if (nextStep === 4) {
      sendBotMessage(
        'Gracias. Con base en tu perfil, la app de Racso te ayudará a optimizar tus postulaciones y a automatizar tu preparación de entrevistas. Déjame tu nombre y correo para reservar tu acceso preferente a la Beta y, como regalo de bienvenida, enviarte nuestra guía de "3 Acciones Inmediatas para que tu CV deje de ser invisible".'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors sometimes, but we configured CORS. Let's send normal json.
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Plain text avoids preflight CORS restrictions sometimes
        },
        body: JSON.stringify({
          nombre,
          email,
          vacantes,
          entrevistas,
          barrera
        })
      });

      // Since we use no-cors, we won't read the response object properly, but the browser will execute the request.
      // We assume it's successful if it doesn't throw.
      setSubmitSuccess(true);
      
      // Let's add a final friendly bot message
      setTimeout(() => {
        sendBotMessage(`¡Estupendo, ${nombre}! Acabo de registrarte para la Beta. En las próximas horas recibirás la guía en tu correo electrónico. ¡Nos vemos pronto!`);
      }, 500);

    } catch (err) {
      console.error('Error submitting form:', err);
      setErrorMsg('Tuvimos un problema enviando los datos. Por favor, intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="survey-backdrop">
      <div className="survey-container">
      {/* Top Navbar */}
      <header className="survey-header glass-panel">
        <div className="header-left">
          {onClose && (
            <button className="back-btn" onClick={onClose} aria-label="Volver al inicio">
              <ArrowLeft size={20} />
            </button>
          )}
          <div className="bot-avatar">
            <span className="avatar-letter">R</span>
            <div className="pulsing-dot"></div>
          </div>
          <div className="bot-info">
            <h3>Racso AI</h3>
            <p>Coach de Empleabilidad</p>
          </div>
        </div>
        {onClose && (
          <button className="close-link-btn" onClick={onClose}>
            Volver a la Web
          </button>
        )}
      </header>

      {/* Chat Area */}
      <main className="chat-window">
        <div className="chat-messages">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`chat-bubble-wrapper ${msg.sender}`}
              >
                <div className={`chat-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="chat-bubble-wrapper bot"
              >
                <div className="chat-bubble bot typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Action panel at the bottom */}
      <footer className="action-panel glass-panel">
        <div className="action-container">
          <AnimatePresence mode="wait">
            {/* Step 0: Welcome screen */}
            {step === 0 && !isTyping && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="options-grid single"
              >
                <button
                  className="button-primary option-btn"
                  onClick={() => handleUserResponse('Sí, hablemos.', 'start', 1)}
                >
                  Contar mi situación actual
                </button>
              </motion.div>
            )}

            {/* Step 1: Postulaciones */}
            {step === 1 && !isTyping && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="options-grid"
              >
                <button
                  className="option-btn glass-btn"
                  onClick={() => handleUserResponse('Ninguna vacante', '0', 2)}
                >
                  0 postulaciones
                </button>
                <button
                  className="option-btn glass-btn"
                  onClick={() => handleUserResponse('Entre 1 y 3 vacantes', '1-3', 2)}
                >
                  1 - 3 postulaciones
                </button>
                <button
                  className="option-btn glass-btn"
                  onClick={() => handleUserResponse('3 vacantes o más', '3 o más', 2)}
                >
                  3 o más postulaciones
                </button>
              </motion.div>
            )}

            {/* Step 2: Llamadas de entrevista */}
            {step === 2 && !isTyping && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="options-grid"
              >
                <button
                  className="option-btn glass-btn"
                  onClick={() => handleUserResponse('Ninguna llamada', '0', 3)}
                >
                  0 llamadas
                </button>
                <button
                  className="option-btn glass-btn"
                  onClick={() => handleUserResponse('1 llamada', '1', 3)}
                >
                  1 llamada
                </button>
                <button
                  className="option-btn glass-btn"
                  onClick={() => handleUserResponse('2 llamadas o más', '2 o más', 3)}
                >
                  2 o más llamadas
                </button>
              </motion.div>
            )}

            {/* Step 3: Causa del dolor */}
            {step === 3 && !isTyping && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="options-grid vertical"
              >
                <button
                  className="option-btn glass-btn text-left"
                  onClick={() => handleUserResponse('Mi CV no genera interés', 'Mi CV no genera interés', 4)}
                >
                  📄 Mi CV no genera interés
                </button>
                <button
                  className="option-btn glass-btn text-left"
                  onClick={() => handleUserResponse('Me bloqueo en las entrevistas', 'Me bloqueo en las entrevistas', 4)}
                >
                  🗣️ Me bloqueo en las entrevistas
                </button>
                <button
                  className="option-btn glass-btn text-left"
                  onClick={() => handleUserResponse('No sé organizar mis postulaciones', 'No sé organizar mis postulaciones', 4)}
                >
                  🗓️ No sé organizar mis postulaciones
                </button>
              </motion.div>
            )}

            {/* Step 4: Capture email and name */}
            {step === 4 && !isTyping && !submitSuccess && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="form-wrapper"
              >
                <form onSubmit={handleSubmit} className="capture-form">
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="input-group">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  {errorMsg && <p className="error-text">{errorMsg}</p>}

                  <button
                    type="submit"
                    className="button-primary submit-btn"
                    disabled={isSubmitting || !nombre.trim() || !email.trim()}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner" />
                        Registrando...
                      </>
                    ) : (
                      <>
                        Enviar y obtener acceso
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 5: Success Screen */}
            {submitSuccess && !isTyping && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="success-wrapper"
              >
                <CheckCircle2 size={48} className="success-icon" />
                <h4>¡Registro completado!</h4>
                <p>Tu acceso beta ha sido reservado. En las próximas horas recibirás la guía en tu correo.</p>
                {onClose && (
                  <button onClick={onClose} className="button-secondary return-btn">
                    Volver al sitio principal
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
      </div>
    </div>
  );
}
