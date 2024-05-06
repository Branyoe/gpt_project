// middlewares/newUser.js

const fs = require('fs');
const path = require('path');

function newUser(req, res, next) {
    const { username, password } = req.body;

    // Verificar si el archivo de usuarios existe
    const usersFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');
    if (!fs.existsSync(usersFilePath)) {
        // Si el archivo no existe, crearlo y escribir un array vacío
        fs.writeFileSync(usersFilePath, '[]', 'utf8');
    }

    // Leer el archivo JSON que contiene la información de los usuarios
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    const users = JSON.parse(usersData);

    // Verificar si el nombre de usuario ya existe
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.render('auth/sign-up', { message: 'El nombre de usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = {
        username,
        password // En una aplicación real, la contraseña debería ser cifrada antes de almacenarla
    };
    users.push(newUser);

    // Guardar el nuevo usuario en el archivo JSON de usuarios
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4), 'utf8');

    // Crear el archivo de tareas para el nuevo usuario
    const tasksFilePath = path.join(__dirname, '..', '..', 'data', `${username}_tasks.json`);
    fs.writeFileSync(tasksFilePath, '[]', 'utf8');

    next();
}

module.exports = newUser;

