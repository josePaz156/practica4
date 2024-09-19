import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

const Register = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState(0);
    const [registro, setRegistro] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const add = ()=>{
        Axios.post("http://localhost:5000/create", {
            nombres:nombres,
            apellidos:apellidos,
            registro:registro,
            email:email,
            password:password
        }).then(()=>{
            alert("Usuario registrado");
        })

    }
    

    const handleRegister = (e) => {
        e.preventDefault();
        // Lógica para registrar un nuevo usuario (simulado aquí)
        console.log("Usuario registrado:", email);
        navigate('/login');
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirige a la página de login
    };

    return (
        <div>
            <h2>Registrar</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Registro academico:</label>
                    <input 
                        type="number" 
                        onChange={(e) => setRegistro(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Nombres:</label>
                    <input 
                        type="text"  
                        onChange={(e) => setNombres(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input 
                        type="text"  
                        onChange={(e) => setApellidos(e.target.value)} 
                        required 
                    />
                </div>
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
                        type="text"  
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                
                <button onClick={add}>Registrar</button>
            </form>
            <button onClick={handleLoginRedirect} style={{ marginTop: '10px' }}>
                ¿Ya tienes una cuenta? Inicia sesión
            </button>
        </div>
    );
};

export default Register;
