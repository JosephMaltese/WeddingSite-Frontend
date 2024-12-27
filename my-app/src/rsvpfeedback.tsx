import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/feedback.css";
import Button from 'react-bootstrap/Button';
import Footer from './footer';
import { LanguageContext } from './LanguageContext';

function RsvpFeedback () {
    const navigate = useNavigate();
    const { language } = useContext(LanguageContext);
    
    const handleReturnHome = () => {
        navigate('/');
    }
    return (
        <div className="container">
            <h1>{language === 'english' ? 'Thank you for your RSVP!' : 'Merci de votre réponse!'}</h1>
            <Button variant="dark" size="lg" onClick={handleReturnHome}>{language === 'english' ? 'Return Home' : 'Retourner à l`accueil'}</Button>
            <Footer />
        </div>
    );
}

export default RsvpFeedback;