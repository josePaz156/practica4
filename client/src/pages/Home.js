import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [contenidoPost, setContenidoPost] = useState('');
    const [posts, setPosts] = useState([]);
    
    // Obtener los datos del usuario desde el localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpiar los datos del usuario al cerrar sesión
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleCreatePost = (e) => {
        e.preventDefault();

        if (!user) {
            alert('Debes iniciar sesión para publicar');
            return;
        }

        // Enviar la publicación con el ID del usuario autenticado
        axios.post('http://localhost:5000/createPost', { usuario_id: user.id_usuario, contenido: contenidoPost })
            .then((response) => {
                alert(response.data.message);
                setContenidoPost(''); // Limpiar el campo de texto después de publicar
                fetchPosts(); // Volver a cargar las publicaciones
            })
            .catch((error) => {
                alert('Error al crear la publicación');
            });
    };

    const fetchPosts = () => {
        axios.get('http://localhost:5000/getPosts')
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.error('Error al cargar las publicaciones:', error);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleEditProfile = () => {
        navigate('/editProfile');
    };

    return (
        <div>
            <h2>Página Principal</h2>
            <form onSubmit={handleCreatePost}>
                <textarea
                    value={contenidoPost}
                    onChange={(e) => setContenidoPost(e.target.value)}
                    placeholder="Escribe una nueva publicación..."
                    required
                />
                <button type="submit">Publicar</button>
            </form>

            <h3>Publicaciones Recientes</h3>
            <div>
                {posts.map((post, index) => (
                    <div key={index}>
                        <h4>{post.autor}</h4>
                        <p>{post.contenido}</p> {/* Mostrar el contenido de la publicación */}
                        <small>{post.fecha}</small> {/* Mostrar la fecha de la publicación */}
                    </div>
                ))}
            </div>

            {/* Botón para editar perfil */}
            <button onClick={handleEditProfile}>Editar Perfil</button>
            
            {/* Botón para cerrar sesión */}
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Home;
