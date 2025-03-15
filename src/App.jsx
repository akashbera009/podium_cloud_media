import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './assets/user/Login';
import Register from './assets/user/Register';
import Upload from './assets/phootos/Upload';
import DisplayMedia from './assets/phootos/DisplayMedia';
import Authenticate_Layout from './assets/user/Authenticate_Layout';
import DisplayVideos from './assets/phootos/DisplayVideos';
import DisplayImages from './assets/phootos/DisplayImages';
import DisplayMusic from './assets/phootos/DisplayMusic';
import Landing from './assets/Landing';

const repoName = "podium_cloud_media"; // GitHub Pages repo name

function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [profileDisplay, setProfileDisplay] = useState(false);

  useEffect(() => {
    setUser(localStorage.getItem('user'));
  }, []);

  const handleProfileClick = () => {
    setProfileDisplay(!profileDisplay);
  };

  const signOut = () => {
    localStorage.setItem('user', "");
    localStorage.setItem('token', null);
    window.location.href = `/${repoName}/auth/login`; // Fix Sign-out Redirect
  };

  return (
    <>
      <h1>Photos and Videos</h1>
      <Router basename={`/${repoName}/`}> 
        <nav>
          <img 
            src="https://i.ibb.co/gZhRFvN/cloud-media-logo.png" 
            alt="cloud-media-logo" 
            height="50px" 
            border="0"
          />
          <div className="profile-container">
            {user ? (
              <button className="profile-name" onClick={handleProfileClick}>
                {user}
              </button>
            ) : (
              <Link to="/auth/login" className="profile-name">
                Sign-in
              </Link>
            )}

            {profileDisplay && (
              <div className="profile-popup">
                <p className="profile-name">{user || 'Sign-in'}</p>
                <button className="signout-button" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Authenticate_Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/upload" element={<Upload />} />
          <Route path="/display" element={<DisplayMedia />} />
          <Route path="/display/videos" element={<DisplayVideos />} />
          <Route path="/display/images" element={<DisplayImages />} />
          <Route path="/display/music" element={<DisplayMusic />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
