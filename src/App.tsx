import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ConversationalForm from './components/ConversationalForm';

function App() {
  const [isSurveyMode, setIsSurveyMode] = useState(false);

  const checkRoute = () => {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    
    const isSubdomain = hostname.startsWith('encuesta.') || 
                        hostname.startsWith('waitlist.') || 
                        hostname.startsWith('interesados.');
                        
    const isPath = pathname.toLowerCase() === '/encuesta' || 
                   pathname.toLowerCase() === '/waitlist' || 
                   pathname.toLowerCase() === '/join';
                   
    setIsSurveyMode(isSubdomain || isPath);
  };

  useEffect(() => {
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const openSurvey = () => {
    window.history.pushState(null, '', '/encuesta');
    setIsSurveyMode(true);
  };

  const closeSurvey = () => {
    window.history.pushState(null, '', '/');
    setIsSurveyMode(false);
  };

  if (isSurveyMode) {
    return <ConversationalForm onClose={closeSurvey} />;
  }

  return (
    <div className="app-container">
      <Navbar onOpenSurvey={openSurvey} />
      <main>
        <Hero onOpenSurvey={openSurvey} />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
