import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRSVP, setHasRSVP] = useState(false);
  const [hasEnteredCode, setHasEnteredCode] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const rsvp = () => {
    setHasRSVP(true);
  }

  const enterCode = () => {
    setHasEnteredCode(true);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, rsvp, hasRSVP, hasEnteredCode, enterCode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
