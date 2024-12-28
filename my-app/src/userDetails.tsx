import React, {useState, useEffect} from 'react';
//import axios from 'axios';
import axios from './axiosconfig';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/userdetails.css";
import Button from 'react-bootstrap/Button';

interface FamilyMember {
    name: string;
    attending: boolean;
    plusOne: boolean;
    plusOneName: string;
}

interface User {
    email: string;
    lastname: string;
    token: string;
    rsvp: boolean;
    attending: boolean;
    memberCount: number;
    familyMembers: FamilyMember[];
}

const UserDetails: React.FC = () => {
    const { email } = useParams<{ email: string }>();
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/auth/getUser/${email}`);
                console.log('Fetched user data:', response.data.user);
                setUser(response.data.user);

            } catch (error) {
                console.log(error);
            }
        }

        fetchUser();

    }, [email]);


    const handleBack = () => {
        navigate('/admin');
    }

    if (!user ) {
        return (<div>Loading....</div>);
    }

    return (
        <div className="container">
            <Button variant="dark" size="sm" className="backButton"onClick={handleBack}>Back</Button>
            <h1 className="mainTitle">{user.lastname.toUpperCase()} Family Details</h1>
            <div className="subContainer">
                <h2 className="subheading">RSVP Status</h2>
                {user.rsvp ? user.attending ? <p>Attending</p> : <p>Not Attending</p>: <p>Waiting on Response</p>}
            </div>
            { user.rsvp ? user.attending ?
            <div className="subContainer">
                <h2 className="subheading">Number of Family Members Attending</h2>
                <p>{user.memberCount}</p>
            </div>
            : null : null
            }
            <div className="subContainer">
                <h2 className="subheading">Associated Email</h2>
                <p>{user.email}</p>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Unique RSVP Access Code</h2>
                <p>{user.token}</p>
            </div>
            <div className="subContainer">
                <h2 className="subheading">Family Members</h2>
                <ul style={{width: '100%'}}>
                    {user.familyMembers.map((member, index) => {
                        return (
                            <li className="memberDetails">
                                <p id="name">{member.name.toUpperCase()}</p>
                                {user.rsvp ?
                                <div className="memberDetails2"> 
                                    <p className="memberDetailsItem">Attending: {member.attending ? 'Yes' : 'No'}</p>
                                    <p className="memberDetailsItem">Plus One: {member.plusOne ? 'Yes' : 'No'}</p>
                                    {member.plusOne ? <p className="memberDetailsItem">Plus One Name: {member.plusOneName}</p> : null}
                                </div>
                                : null}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>


    );

}

export default UserDetails;