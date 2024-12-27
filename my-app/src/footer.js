import React, { useContext } from 'react'; 
import './footerstyles.css';
import { LanguageContext } from './LanguageContext'; 

function Footer() {
    const { language } = useContext(LanguageContext);

    return (
        <footer id="footer">
            <h2>M & P</h2>
            <hr />
            <h3>7.12.2025</h3>


            <p>© 2024 Marie-Eve & Peter</p>
            
            <p className="smalltext">{language === 'english' ? 'Website developed by Joseph Maltese' : 'Site web développé par Joseph Maltese'}</p>
        </footer>
    );

}

export default Footer;