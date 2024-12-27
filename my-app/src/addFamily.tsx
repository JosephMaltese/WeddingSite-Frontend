import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/addfamily.css';
import Button from 'react-bootstrap/Button';

function AddFamily () {

    const [numGuests, setNumGuests] = useState(1); // Default value is 1
    const [guestNames, setGuestNames] = useState(['']);
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [canBringPlusOneList, setCanBringPlusOneList] = useState([false]); 
    const navigate = useNavigate();


    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleNumChange = (event) => {
        const newNumGuests = parseInt(event.target.value, 10);
        setNumGuests(newNumGuests);

        if (newNumGuests > guestNames.length) {
            const newGuestNames = [...guestNames, ...Array(newNumGuests - guestNames.length).fill('')];
            setGuestNames(newGuestNames);
            const newCanBringPlusOneList = [...canBringPlusOneList, ...Array(newNumGuests - canBringPlusOneList.length).fill(false)];
            setCanBringPlusOneList(newCanBringPlusOneList);
        }
        else {
            const newGuestNames = guestNames.slice(0, newNumGuests);
            setGuestNames(newGuestNames);
            const newCanBringPlusOneList = canBringPlusOneList.slice(0, newNumGuests);
            setCanBringPlusOneList(newCanBringPlusOneList);
        }
    };

    const handleGuestNameChange = (index, event) => {
        const newGuestNames = [...guestNames];
        newGuestNames[index] = event.target.value;
        setGuestNames(newGuestNames);
    }

    interface Guest {
        name: string;
        attending: boolean;
        plusOne: boolean;
        canBringPlusOne: boolean;
      }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email === '' && lastName === '') {
            alert('Please fill in a last name and email');
            return;
        }
        else if (email === '') {
            alert('Please fill in an email');
            return;
        }
        else if (lastName === '') {
            alert('Please fill in a last name');
            return;
        }


        const guestStructs: Guest[] = [];
        for (let i = 0; i < guestNames.length; i++) {
            if (guestNames[i] === '') {
                alert('Please fill in all guest names');
                return;
            }
            guestStructs.push({"name": guestNames[i], "attending": false, "plusOne": false, "canBringPlusOne": canBringPlusOneList[i]});
        }


        const family = {
            members: guestStructs,
            lastname: lastName,
            email: email
        };

        axios.post('/api/auth/createUser', family)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('There was an error!', error);

                if (error.response && error.response.status === 400) {
                    alert('A user with that email already exists!');
                }
            });

        alert('Family added successfully!');
        navigate('/admin');
    };

    return (
        <div className="container">
            <h1 className="mainTitle">Add Family/Individual</h1>
            <div>
                <p>Use the form below to add a new family or individual to the guest list.</p>
            </div>
            <form className="subContainer" onSubmit={handleSubmit}>
                <label>
                    Family Last Name:
                    <input type="text" name="familyName" onChange={(e)=> handleLastNameChange(e)} />
                </label>
                <label>
                    Associated Email:
                    <input type="text" name="email" onChange={(e)=> handleEmailChange(e)}/>
                </label>
                <label>
                    Number of Members:
                    <input type="number" name="numGuests" value={numGuests} onChange={handleNumChange} min="1" max="10"/>
                </label>
                <ul>
                    {
                        guestNames.map((name, index) => {
                            return (
                            <div>
                                <label>Member #{index+1} Name <input type="text" value={name} onChange={(e) => handleGuestNameChange(index, e)} /> Allowed PlusOne? <input style={{width: '1rem', height: '1rem', margin: 'auto'}} checked={canBringPlusOneList[index]} onChange={(e) => {
                                    const newCanBringPlusOneList = [...canBringPlusOneList];
                                    newCanBringPlusOneList[index] = e.target.checked;
                                    setCanBringPlusOneList(newCanBringPlusOneList);
                                }} type="checkbox"></input></label>


                            </div>);
                        })
                    }
                </ul>
                <div className='buttonGroup'>
                    <Button variant="dark" className="buttons" type="button" onClick={() => navigate('/admin')}>Cancel</Button>
                    <Button variant="dark" className="buttons" type="submit">Add Family</Button>
                </div>
            </form>
        </div>
    );
}

export default AddFamily;