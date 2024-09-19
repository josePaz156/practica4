import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Login />} /> {/* Redirige a login por defecto */}
          <Route path="/editProfile" element={<EditProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
