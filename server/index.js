const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "usuarios"

});

app.post("/create", (req, res)=>{
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const registro = req.body.registro;
    const email = req.body.email;
    const password = req.body.password;

    db.query('INSERT INTO usuarios(nombre, apellido, registro, email, pass) VALUES(?,?,?,?,?)', [nombres,apellidos,registro,email,password],
        (err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send("Usuario registrado con exito")
            }
        }
    );
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query('SELECT * FROM usuarios WHERE email = ? AND pass = ?', [email, password], (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        }
        if (result.length > 0) {
            res.send({ message: "Login exitoso", user: result[0] });
        } else {
            res.status(401).send({ message: "Credenciales inválidas" });
        }
    });
});

// Ruta para crear una publicación
app.post("/createPost", (req, res) => {
    const { usuario_id, contenido } = req.body;

    db.query(
        'INSERT INTO publicaciones(id_usuario, contenido, fecha) VALUES(?, ?, NOW())',
        [usuario_id, contenido],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al crear la publicación");
            } else {
                res.send({ message: "Publicación creada con éxito" });
            }
        }
    );
});

// Ruta para obtener las publicaciones
app.get("/getPosts", (req, res) => {
    db.query(
        `SELECT publicaciones.id_publicaciones, publicaciones.contenido, publicaciones.fecha, 
                usuarios.nombre AS autor 
         FROM publicaciones 
         JOIN usuarios ON publicaciones.id_usuario = usuarios.id_usuario 
         ORDER BY publicaciones.fecha DESC`,
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al obtener las publicaciones");
            } else {
                res.send(result);
            }
        }
    );
});

// Ruta para actualizar el perfil del usuario
app.put("/updateProfile", (req, res) => {
    const { id_usuario, nombres, apellidos, email, password } = req.body;

    db.query(
        'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, pass = ? WHERE id_usuario = ?',
        [nombres, apellidos, email, password, id_usuario],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el perfil");
            } else {
                res.send({ message: "Perfil actualizado con éxito" });
            }
        }
    );
});

// Ruta para obtener los datos del usuario
app.get("/getUser/:id", (req, res) => {
    const id_usuario = req.params.id;

    db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener la información del usuario");
        } else {
            res.send(result[0]); // Devolver el primer (y único) resultado
        }
    });
});

app.listen(5000, () =>{
    console.log("Corriendo en puerto 5000")
})