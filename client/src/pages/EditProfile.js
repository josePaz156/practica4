import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Obtener los datos del usuario desde el localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar los datos del usuario al montar el componente
        axios.get(`http://localhost:5000/getUser/${user.id_usuario}`)
            .then((response) => {
                const userData = response.data;
                setNombres(userData.nombre);
                setApellidos(userData.apellido);
                setEmail(userData.email);
            })
            .catch((error) => {
                console.error('Error al obtener la información del usuario:', error);
            });
    }, [user.id_usuario]);

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        axios.put('http://localhost:5000/updateProfile', {
            id_usuario: user.id_usuario,
            nombres,
            apellidos,
            email,
            password,
        })
        .then((response) => {
            alert(response.data.message);
            // Actualizar los datos del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({ ...user, nombre: nombres, apellido: apellidos, email }));
            navigate('/home');
        })
        .catch((error) => {
            alert('Error al actualizar el perfil');
        });
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    placeholder="Nombres"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Apellidos"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Actualizar Perfil</button>
            </form>
        </div>
    );
};

export default EditProfile;
