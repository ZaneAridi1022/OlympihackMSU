import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import './App.css';
import GithubLoginScreen from "./screens/GithubLoginScreen";
import ProfilePage from "./screens/Profile";
import Landing from "./screens/Landing";
import UserPage from "./screens/ProfilePage";
import Taskbar from './components/Taskbar/Taskbar';

function App() {
  // forward the user to the github login screen (we pass in the client ID)
  // User is now on the github side and login
  // When user decides to login... they get forwarded back to localhost:3000
  // Use the code to get the access token
  return (
    <>
      <Taskbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<GithubLoginScreen/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/" element={<GithubLoginScreen/>}/>
        <Route path="/profilepage" element={<ProfilePage/>}/>
        <Route path="/user/:userId" element={<UserPage />}/>
      </Routes>
    </>
  );
}

export default App;
