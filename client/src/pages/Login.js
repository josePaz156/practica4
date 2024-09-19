import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/login', { email, password })
            .then((response) => {
                if (response.data.message === "Login exitoso") {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    alert(response.data.message);navigate('/home');
                    navigate('/home'); // Redirige a la página principal si el login es exitoso
                }
            })
            .catch((error) => {
                alert('Credenciales inválidas');
            });
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige a la página de registro
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <button onClick={handleRegisterRedirect} style={{ marginTop: '10px' }}>
                ¿No tienes una cuenta? Regístrate
            </button>
        </div>
    );
};

export default Login;
