import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axios from './axiosconfig';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './styles/edituserdetails.css';
import Alert from 'react-bootstrap/Alert'
import LoadingScreen from "./loadingScreen";

interface FamilyMember {
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
    finishedRSVP: boolean;
    familyMembers: FamilyMember[];
}

const EditInformation: React.FC = () => {
    const { email } = useParams<{ email: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const [numGuests, setNumGuests] = useState<number>(0); // Default to 0 initially
    const [guests, setGuests] = useState<FamilyMember[]>([]);
    const [editedEmail, setEditedEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [rsvp, setRsvp] = useState(false);
    const [attending, setAttending] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlert3, setShowAlert3] = useState(false);
    const [showAlert4, setShowAlert4] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        ////// MIGHT GET RID OF
        if (!user) {
            return;
        }

        if (editedEmail === '' && lastName === '') {
            setShowAlert2(true);
            window.scrollTo(0, 0);
            return;
        }
        else if (editedEmail === '') {
            setShowAlert3(true);
            window.scrollTo(0, 0);
            return;
        }
        else if (lastName === '') {
            setShowAlert4(true);
            window.scrollTo(0, 0);
            return;
        }




        let finalMemberCount = 0; // Start with 0
        guests.forEach((guest) => {
            if (guest.attending) {
                finalMemberCount++;
                if (guest.plusOne) {
                    finalMemberCount++;
                }
            }
        });


        const updatedUser = {
            email: editedEmail,
            rsvp: rsvp,
            attending: attending,
            familyMembers: guests,
            lastname: lastName,
            memberCount: finalMemberCount,
            finishedRSVP: rsvp,
        }

        const response = await axios.put('/api/auth/updateUser', updatedUser).then((response) => {console.log(response);}).catch((error) => {
            console.error('There was an error!', error);

            if (error.response && error.response.status === 400) {
                alert('A user with that email already exists!');
            }
        });

        alert('Family updated successfully!');
        navigate('/admin');
    }


    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
        setShowAlert2(false);
        setShowAlert4(false);
    }

    const handleEmailChange = (event) => {
        setEditedEmail(event.target.value);
        setShowAlert2(false);
        setShowAlert3(false);
    }

    const handleNumChange = (event) => {
        const newNumGuests = parseInt(event.target.value, 10);
        setNumGuests(newNumGuests);

        if (newNumGuests > guests.length) {
            const newGuests = [...guests, ...Array(newNumGuests - guests.length).fill({name: '', attending: false, plusOne: false})];
            setGuests(newGuests);
        }
        else {
            const newGuests = guests.slice(0, newNumGuests);
            setGuests(newGuests);
        }
    }

    const handleGuestNameChange = (index, event) => {
        const newGuests = [...guests];
        newGuests[index].name = event.target.value;
        setGuests(newGuests);
    }

    const handleDeleteMember = (index) => {
        const newGuests = [...guests];
        newGuests.splice(index, 1);
        setGuests(newGuests);
        setNumGuests(newGuests.length);
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/auth/getUser/${email}`);
            const fetchedUser = response.data.user;
            console.log('Fetched user data:', response.data.user);
            setUser(fetchedUser);
            setGuests(fetchedUser.familyMembers);
            setLastName(fetchedUser.lastname);
            setEditedEmail(fetchedUser.email);
            setRsvp(fetchedUser.rsvp);
            setAttending(fetchedUser.attending);
            setNumGuests(fetchedUser.familyMembers.length);
            setLoading(false);

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [email]);

    if (loading) {
        return (<LoadingScreen />);
    }

    return (
        <div className="container">
            {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible >Please fill out the name for each guest and plus one.</Alert>}
            {showAlert2 && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible >Please fill out the last name and email fields.</Alert>}
            {showAlert3 && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible >Please fill out the email field.</Alert>}
            {showAlert4 && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible >Please fill out the last name field.</Alert>}
            <h1 className="mainTitle">Edit Family/Individual Information</h1>
            <div>
                <p>Use the form below to edit guest information for the given family.</p>
            </div>
            <form className="subContainer">
                <label>
                    Family Last Name:
                    <input className="inputuserdetails" type="text" value={lastName} name="familyName" onChange={(e)=> handleLastNameChange(e)} />
                </label>
                <label>
                    Associated Email:
                    <input className="inputuserdetails" type="text" value={editedEmail} name="email" onChange={(e)=> handleEmailChange(e)}/>
                </label>
                <label>
                    Number of Members:
                    <input className="inputuserdetails" type="number" name="numGuests" value={numGuests} onChange={handleNumChange} min="1" max="10"/>
                </label>
                <ul style={{padding: 0, width: "90%", marginTop: "2rem"}}>
                    {
                        guests.map((guest, index) => {
                            return (
                            <li className="familyMember">
                                <p className="memberName">Member #{index+1} Name <input type="text" className="memberNameInput" value={guest.name} onChange={(e) => handleGuestNameChange(index, e)} /></p>
                                <p className="attending">Attending</p>
                                <input className="checkbox" type="checkbox" checked={guest.attending} onChange={(e) => {
                                        const newGuests = [...guests];
                                        newGuests[index].attending = e.target.checked;
                                        setGuests(newGuests);
                                    }} />
                                <p className='attending'>Allowed Plus One?</p>
                                <input className="checkbox" type="checkbox" checked={guest.canBringPlusOne} onChange={(e)=> {
                                        const newGuests = [...guests];
                                        newGuests[index].canBringPlusOne = e.target.checked;
                                        setGuests(newGuests);
                                    }} />
                                {guest.canBringPlusOne &&
                                <div>
                                    <p className="attending">Plus One</p>
                                            <input type="checkbox" className="checkbox" checked={guest.plusOne} onChange={(e)=> {
                                                const newGuests = [...guests];
                                                newGuests[index].plusOne = e.target.checked;
                                                setGuests(newGuests);
                                            }
                                            }/>
                                </div>
                                }
                                {guest.canBringPlusOne && guest.plusOne && <div><p className="memberName">Plus One Name</p><input type="text" className="memberNameInput" value={guest.plusOneName} onChange={(e) => {
                                    const newGuests = [...guests];
                                    newGuests[index].plusOneName = e.target.value;
                                    setGuests(newGuests);
                                }} /></div>}
                                <Button className="deleteButton" variant="dark" size="sm" onClick={() => handleDeleteMember(index)}>Delete Member</Button>

                            </li>);
                        })
                    }
                </ul>
                <div>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <h3>RSVP Status</h3>
                        <input className="checkbox" type="checkbox" checked={rsvp} onChange={(e) => setRsvp(e.target.checked)} />
                    </div>
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <h3>Attending Event</h3>
                        <input className="checkbox" type="checkbox" checked={attending} onChange={(e) => setAttending(e.target.checked)} />
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    <Button className="bottomBtn" variant="dark" onClick={() => navigate('/admin')}>Cancel</Button>
                    <Button className="bottomBtn" variant="dark" type="submit" onClick={handleSubmit}>Confirm Changes</Button>
                </div>
            </form>
        </div>



    );

}

export default EditInformation;