import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
// import GithubLoginScreen from "../../client2/src/screens/GithubLoginScreen";
import ProfilePage from "../../client2/src/screens/Profile";
import Landing from "../../client2/src/screens/Landing";
import AboutUs from "../../client2/src/screens/AboutMe";

import GithubLoginScreen from './screens/GithubLoginScreen';

import UserPage from './screens/UserPage';

function App() {
  // forward the user to the github login screen (we pass in the client ID)
  // User is now on the github side and login
  // When user decides to login... they get forwarded back to localhost:3000
  // Use the code to get the access token
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/login" element={<GithubLoginScreen/>}/>
        <Route path="/user/:userId" element={<UserPage />}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
      </Routes>
    </>
  );
}

export default App;
