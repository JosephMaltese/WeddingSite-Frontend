import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/admin.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useAuth } from './authContext';

interface User {
    email: string;
    lastname: string;
    token: string;
    rsvp: boolean;
    attending: boolean; 
    memberCount: number;
    familyMembers: familyMember[];
}

interface familyMember {
    name: string;
    //attending: boolean;
    //plusOne: boolean;
}


const Admin: React.FC = () => {
    const { logout } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const [guestCount, setGuestCount] = useState(0);


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('/api/auth/getUsers');
            setUsers(response.data.users);
            let count = 0;
            response.data.users.filter((user) => user.attending).forEach((user) => {count += user.memberCount});
            setGuestCount(count);
        }
        catch (error) {
            console.error(error);
        }

    }

    const handleAddFamily = () => {
        navigate('/addFamily');
    }

    const handleDeleteUser = async (email: string) => {
        try {
            await axios.delete('/api/auth/deleteUser', {data: {email: email}});
            getUsers();
        } catch (error) {
            console.error(error);
        }
    }

    const handleViewDetails = (email: string) => {
        navigate(`/userDetails/${email}`);
    }

    const handleEditInformation = (email: string) => {
        navigate(`/editInformation/${email}`);
    }


    return (
        <div className="container">
            <Button className="backButton" variant="dark" size="sm" onClick={() => {logout();
                navigate('/');}}>Home</Button>
            <h1 className="mainTitle">Guest Information Admin Page</h1>
            <div>
                <p>Here you can manage guest information for this event. Each invited family/individual is listed below, with options to view specific details, edit information, as well as delete and add families from the list.</p>
            </div>
            <div>
                <Button className="addButton" variant="dark" size="lg" onClick={handleAddFamily}>Add Family/Individual</Button>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Invited Families/Individuals</h2>
                <ul>
                    {users.map((user, index) => 
                    
                    <li className="invitedFamilies" key={index}>
                        <span className="familyName">{user.lastname} Family</span>
                        <ButtonGroup className="btngroup">
                            <Button variant="dark" onClick={()=> handleViewDetails(user.email)}>View Details</Button>
                            <Button variant="dark" onClick={() => handleEditInformation(user.email)}>Edit Information</Button>
                            <Button variant="dark" onClick={() => handleDeleteUser(user.email)}>Delete</Button>
                        </ButtonGroup>
                    </li>)}
                </ul>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Total Guests attending</h2>
                <p>{guestCount}</p>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Families Attending</h2>
                <ul>
                    {users.filter((user) => user.rsvp && user.attending).map((user, index) => {
                        return (
                            <li className="basiclist" key={index}>
                                {user.lastname} Family
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Families Not Attending</h2>
                <ul>
                    {users.filter((user) => user.rsvp && !user.attending).map((user, index) => {
                        return (
                            <li className="basiclist" key={index}>
                                {user.lastname} Family
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Waiting on Response</h2>
                <ul>
                    {users.filter((user) => !user.rsvp).map((user, index) => {
                        return (
                            <li className="basiclist" key={index}>
                                {user.lastname} Family
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );
}

export default Admin;