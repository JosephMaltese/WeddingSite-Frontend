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

    const closeNavBar = () => {
        navRef.current.classList.remove("responsive_nav");
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    return (
        <header>
            <h3>M&P</h3>
            <nav ref={navRef}>
                <NavDropdown id="nav-dropdown-dark-example" title={language === 'english' ? "Language" : "Langage"} menuVariant="light">
                    <NavDropdown.Item onClick={() => setLanguage('english')}>{language === 'english' ? 'English' : "Anglais"}</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => setLanguage('french')}>{language === 'english' ? 'French' : "Français"}</NavDropdown.Item>
                </NavDropdown>
                <a href="#home" onClick={closeNavBar}>{language === 'english' ? 'Home' : 'Accueil'}</a>
                <a href="#details" onClick={closeNavBar}>{language === 'english' ? 'Details' : 'Détails'}</a>
                <a href="#couple" onClick={closeNavBar}>{language === 'english' ? 'The Couple' : 'Le Couple'}</a>
                <a href="#accommodations" onClick={closeNavBar}>{language === 'english' ? 'Accommodations' : 'Hébergement'}</a>
                <a href="#rsvp" onClick={closeNavBar}>RSVP</a>
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