import React, { useState, useContext } from 'react';
//import axios from 'axios';
import axios from './axiosconfig';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Footer from './footer';
import './styles/rsvp.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
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

const RsvpToEvent: React.FC = () => {
    const location = useLocation();
    const { email } = useParams<{ email: string }>();
    const navigate = useNavigate();
    const { user } = location.state as { user: User };
    const [clicked, setClicked] = useState(false);
    const [attending, setAttending] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);
    


    const handleYes = () => {
        setAttending(true);
        setClicked(true);
        setShowAlert(false);
        
        const yesBtn = document.getElementById("yesBtn");
        const noBtn = document.getElementById("noBtn");

        if (yesBtn && noBtn) {
            yesBtn.style.backgroundColor = "rgb(192,192,192)";
            noBtn.style.backgroundColor = "";
        }
    }

    const handleNo = () => {
        setAttending(false);
        setClicked(true);
        setShowAlert(false);

        const yesBtn = document.getElementById("yesBtn");
        const noBtn = document.getElementById("noBtn");

        if (yesBtn && noBtn) {
            noBtn.style.backgroundColor = "rgb(192,192,192)";
            yesBtn.style.backgroundColor = "";
        }
    }

    const handleSubmit = async () => {
        if (clicked) {
            if (attending) {
                try {
                    setLoading(true)
                    const response = await axios.put('/api/auth/updateUser', { email: user.email, rsvp: true, attending: true, familyMembers: user.familyMembers, lastname: user.lastname, memberCount: user.memberCount, finishedRSVP: false });
                    const data = response.data;
                    console.log(data);
                    setLoading(false)
                    navigate('/rsvp-details', { state: { user: user } });
                } catch (err) {
                    console.log(err)
                    setLoading(false)
                }

            } else {
                setLoading(true)
                const response = await axios.put('/api/auth/updateUser', { email: user.email, rsvp: true, attending: false, familyMembers: user.familyMembers, lastname: user.lastname, memberCount: user.memberCount, finishedRSVP: true });
                navigate('/feedback');
                setLoading(false)

            }

        } else {
            // alert('Please select an option');
            setShowAlert(true);
        }


    }

    return (
        <div className="container">
            {showAlert && <Alert variant="warning">{language === 'english' ? 'Please select an option' : 'Veuillez sélectionner une option'}</Alert>}
            {language === 'english' ? <h1 className="mainTitle">Welcome, {user.lastname} family</h1>: <h1 className="mainTitle">Bienvenue, famille {user.lastname}</h1>}
            <h2 className="subheading">{language === 'english' ? 'Will you be attending this event?' : 'Est-ce que vous allez être présent au mariage?'}</h2>
            <div>
                <button id="yesBtn" className={`optionBtn ${attending === true ? '.selected' : ''}`} onClick={handleYes}>{language === 'english' ? 'Yes' : 'Oui'}</button>
                <button id="noBtn" className={`optionBtn ${attending === false ? '.selected' : ''}`} onClick={handleNo}>{language === 'english' ? 'No' : 'Non'}</button>
            </div>
            {loading && 
            <div>
                <Spinner animation="border" role="status"></Spinner>
            </div>
            }
            <Button variant="dark" size="lg" onClick={handleSubmit}>{language === 'english' ? 'Confirm' : 'Soumettre'}</Button>

            <Footer />
        </div>
    );

}

export default RsvpToEvent;
