import './App.css';
import Admin from './admin.tsx';
import AddFamily from './addFamily.tsx';
import UserDetails from './userDetails.tsx';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EditInformation from './editInformation.tsx';
import Landing from './landing.tsx';
import RsvpToEvent from './rsvp.tsx';
import RsvpDetails from './rsvpdetails.tsx';
import RsvpFeedback from './rsvpfeedback.tsx';
import EnterCode from './entercode.tsx';
import AdminLogin from './adminlogin.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './authContext';
import LoadingWrapper from './loadingWrapper';

function App() {
  const { isAuthenticated, hasRSVP, hasEnteredCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const handleLoadingStart = () => setIsLoading(true);
    const handleLoadingEnd = () => setIsLoading(false);

    // Here you can use window.fetch or Axios interceptors to detect loading
    // Add event listeners or logic to detect loading start/end
    // Example with fetch:
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      handleLoadingStart();
      const response = await originalFetch(...args);
      handleLoadingEnd();
      return response;
    };

    return () => {
      // Clean up the original fetch
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <Router>
      <LoadingWrapper isLoading={isLoading}>
        <Routes>
          <Route path="/addFamily" element={isAuthenticated ? <AddFamily/> : <Navigate to="/adminlogin"/>}/>
          <Route path="/admin" element={isAuthenticated ? <Admin/> : <Navigate to="/adminlogin"/>}/>
          <Route path="/userDetails/:email" element={isAuthenticated ? <UserDetails/> : <Navigate to="/adminlogin"/>}/>
          <Route path="/editInformation/:email" element={isAuthenticated ? <EditInformation/> : <Navigate to="/adminlogin" />}/>
          <Route path="*" element={<h1>Not Found</h1>}/>
          <Route path="/rsvp/:email" element={hasEnteredCode? <RsvpToEvent/> : <Navigate to="/enter-code"/>}/>
          <Route path="/rsvp-details" element={hasEnteredCode? <RsvpDetails/> : <Navigate to="/enter-code"/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/feedback" element={hasRSVP ? <RsvpFeedback/> : <Navigate to="/enter-code"/>}/>
          <Route path="/enter-code" element={<EnterCode/>}/>
          <Route path="/adminlogin" element={<AdminLogin/>}/>
        </Routes>
      </LoadingWrapper>
    </Router>
    
  );
}

export default App;


