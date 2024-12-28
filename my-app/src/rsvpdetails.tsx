import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
//import axios from "axios";
import axios from './axiosconfig';
import { useState, useEffect } from "react";
import "./styles/rsvpdetails.css";
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useAuth } from './authContext';
import Spinner from 'react-bootstrap/Spinner';
import { LanguageContext } from './LanguageContext';

interface familyMember {
  name: string;
  attending: boolean;
  plusOne: boolean;
  plusOneName: string;
  canBringPlusOne: boolean;
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

function RsvpDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state as { user: User};
  const [familyMembers, setFamilyMembers] = useState<familyMember[]>(user.familyMembers);
  const [plusOneCount, setPlusOneCount] = useState(0);
  const [attendingCount, setAttendingCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const { rsvp } = useAuth();
  const [loading, setLoading] = useState(false);
  const { language } = useContext(LanguageContext);


  const handleCheckboxChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index].attending = e.target.checked;
    setFamilyMembers(newFamilyMembers);

    if (e.target.checked) {
      setAttendingCount(attendingCount + 1);
      setShowAlert(false);
    }
    else {
      if (familyMembers[index].plusOne) {
        setPlusOneCount(plusOneCount - 1);
        setAttendingCount(attendingCount - 1);
        handlePlusOneChange(index)({target: {checked: false}} as React.ChangeEvent<HTMLInputElement>);
      }
      setAttendingCount(attendingCount - 1);
    }
  }

  const handlePlusOneChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index].plusOne = e.target.checked;
    setFamilyMembers(newFamilyMembers);

    if (e.target.checked) {
      setPlusOneCount(plusOneCount + 1);
    } else {
      setPlusOneCount(plusOneCount - 1);
    }
  }

  const handlePlusOneNameChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowAlert2(false);
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index].plusOneName = e.target.value;
    setFamilyMembers(newFamilyMembers);
  }

  const handleSubmit = async () => {

    if (attendingCount === 0) {
      setShowAlert(true);
      return;
    }

    for (let i = 0; i < familyMembers.length; i++) {
      if (familyMembers[i].attending && familyMembers[i].plusOne && familyMembers[i].plusOneName === '') {
        setShowAlert2(true);
        return;
      }
    }

    try {
      setLoading(true);
      const totalAttending = attendingCount + plusOneCount;
      const response = await axios.put('/api/auth/updateUser', { email: user.email, rsvp: true, attending: true, familyMembers: familyMembers, lastname: user.lastname, memberCount: totalAttending, finishedRSVP: true });
      const data = response.data;
      console.log(data);
      rsvp();
      setLoading(false);
      navigate('/feedback');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <div className="container">
        {showAlert && <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible >{language === 'english' ? 'Please select at least one family member to attend.' : 'S’il-vous-plaît sélectionnez au moins un membre de la famille qui sera présent.'}</Alert>}
        {showAlert2 && <Alert variant="warning" onClose={() => setShowAlert2(false)} dismissible >{language === 'english' ? 'Please provide the name of the plus one for all attending family members.' : 'S’il-vous-plaît veuillez écrire le nom du plus one qui accompagnera le membre de votre famille.'}</Alert>}
        <h1 className="mainTitle">{language === 'english' ? 'RSVP Details' : 'Détails des invités'}</h1>
        <p id="text">{language === 'english' ? 'Thanks, we look forward to seeing you! Please complete your RSVP by providing some additional guest information below.' : 'Nous avons hâte de vous voir! S’il-vous-plaît complétez votre RSVP en nous fournissant les détails pour les invités ci-bas.'}</p>
        <h2 className="subheading">{language === 'english' ? 'Family Members' : 'Membres de la famille'}</h2>
        <ul style={{padding: 0, width: "60%", maxWidth: '90%'}}>
          {familyMembers.map((member, index) => {

            return (
            <li className="familyMember">
              <p className="memberName">{member.name}</p>
              <div style={{display:"flex"}}>
                <p className="optionName">{language === 'english' ? 'Attending:' : 'Sera présent:'}</p>
                <input 
                      type="checkbox"
                      className="Checkbox" 
                      checked={member.attending} 
                      onChange={handleCheckboxChange(index)} 
                  />
              </div>
              {member.attending && member.canBringPlusOne &&
              <div style={{display:"flex"}}>
                <p className="optionName">Plus One:</p>
                <input 
                    type="checkbox" 
                    className="Checkbox"
                    checked={member.plusOne} 
                    onChange={handlePlusOneChange(index)} 
                  />
                </div>
              }
              {member.attending && member.canBringPlusOne && member.plusOne && <input className="plusOneNameInput" type="text" placeholder={language === 'english' ? "Full Name of Plus One" : 'Nom du plus one'} onChange={handlePlusOneNameChange(index)}/>}
            </li>)
          })}
        </ul>

        {loading && 
        
        <div>
          <Spinner animation="border" role="status"></Spinner>
        </div>
        }


        <Button variant="dark" size="lg" onClick={handleSubmit}>{language === 'english' ? 'Submit' : 'Soumettre'}</Button>


    </div>
    );
}

export default RsvpDetails;