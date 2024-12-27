import React, { useContext, useRef } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import './navstyles.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LanguageContext } from './LanguageContext';

function Navbar() {
    const navRef = useRef();
    const { language, setLanguage } = useContext(LanguageContext);

    const showNavBar = () => {
        const isNavVisible = navRef.current.classList.toggle("responsive_nav");
        
        if (isNavVisible) {
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }

    }

    return (
        <header>
            <h3>M&P</h3>
            <nav ref={navRef}>
                <NavDropdown id="nav-dropdown-dark-example" title={language === 'english' ? "Language" : "Langage"} menuVariant="light">
                    <NavDropdown.Item onClick={() => setLanguage('english')}>{language === 'english' ? 'English' : "Anglais"}</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setLanguage('french')}>{language === 'english' ? 'French' : "Français"}</NavDropdown.Item>
                </NavDropdown>
                <a href="#home">{language === 'english' ? 'Home' : 'Accueil'}</a>
                <a href="#details">{language === 'english' ? 'Details' : 'Détails'}</a>
                <a href="#couple">{language === 'english' ? 'The Couple' : 'Le Couple'}</a>
                <a href="#accommodations">{language === 'english' ? 'Accommodations' : 'Hébergement'}</a>
                <a href="#transportation">Transportation</a>
                <a href="#Q&A">{language === 'english' ? 'Q&A' : 'Questions et réponses'}</a>
                <a href="#rsvp">RSVP</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars />
            </button>
    
        </header>

    );

}

export default Navbar;