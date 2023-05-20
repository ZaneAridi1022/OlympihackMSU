import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import GithubLoginScreen from "./screens/GithubLoginScreen";
import ProfilePage from "./screens/Profile";
import Landing from "./screens/Landing";

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
      </Routes>
    </>
  );
}

export default App;
