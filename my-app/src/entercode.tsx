import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import './styles/entercode.css';
import Button from 'react-bootstrap/Button';
import { useAuth } from './authContext';
import Spinner from 'react-bootstrap/Spinner';
import { LanguageContext } from './LanguageContext';

interface familyMember {
    name: string;
    attending: boolean;
    plusOne: boolean;
}

interface User {
    email: string;
    lastname: string;
    token: string;
    rsvp: boolean;
    attending: boolean; 
    memberCount: number;
    familyMembers: familyMember[];
}

function EnterCode() {
    const { enterCode, rsvp, hasRSVP } = useAuth();
    const navigate = useNavigate();
    const [accessCode, setAccessCode] = useState('');
    const [loading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    const handleSubmit = async () => {
        if (accessCode === '') {
            if (language === 'english')
                { alert('Please enter an access code');
                }
            else {
                alert('Veuillez entrer un code d’accès');
            }
            return;
        }

        if (accessCode === 'admin') {
            navigate('/adminlogin');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`/api/auth/userByToken/${accessCode}`);
            const data = response.data;

            if (!data.user) {
                setLoading(false);
                if (language === 'english') {
                    alert('Invalid access code');
                }
                else {
                    alert('Code d’accès invalide');
                }
                setAccessCode('');
                return;
            
            }
            console.log('data', data);
            console.log("email", data.user.email);

            if (data.user.finishedRSVP) {
                setLoading(false);
                rsvp();
                navigate('/feedback');
                return;
            }
            
            setLoading(false);
            enterCode();
            navigate(`/rsvp/${data.user.email}`, { state: { user: data.user } });
            
        }
        catch (err) {
            console.log(err);
            if (language === 'english') {
                alert('Invalid access code');
            }
            else {
                alert('Code d’accès invalide');
            }
            setAccessCode('');
            setLoading(false);
        }

    }

    const handleAccessCodeChange = (e) => {
        setAccessCode(e.target.value);
    }


    return (
        <div className="container">
            <Button variant="dark" size="sm" className="backButton" onClick={() => navigate('/')}>{language === "english" ? 'Back' : "Retour"}</Button>
            <h1 className="mainTitle">{language === "english" ? 'Enter Access Code' : "Entrez le code d’accès"}</h1>
            <div className="subContainer">
                <p>{language === "english" ? 'To RSVP to this event, please begin by entering the unique 6-digit access code provided on your wedding invitation.' : "Pour RSVP au mariage, s’il-vous-plaît entrez le code unique d’accès à 6 caractères que vous pouvez retrouver sur votre invitation."}</p>
                <input type="text" placeholder={language === 'english' ? "Enter Access Code" : 'Entrez le code d’accès'} onChange={(e) => handleAccessCodeChange(e)} value={accessCode}></input>
                {loading && 
                <div>
                    <Spinner animation="border" role="status"></Spinner>
                </div>}
                <Button variant="dark" size="lg" className ="submitButton" onClick={handleSubmit}>{language === "english" ? 'Submit' : "Soumettre"}</Button>
            </div>
            <Footer />

        </div>
    );
}

export default EnterCode;