// middlewares/signIn.js

const fs = require('fs');
const path = require('path');

const signIn = (req, res, next) => {
    const { username, password } = req.body;

    // Verificar las credenciales en el archivo users.json
    const usersFilePath = path.join(__dirname, '..', '..', 'data', 'users.json');
    if (fs.existsSync(usersFilePath)) {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');
        const users = JSON.parse(usersData);

        const user = users.find(user => user.username === username && user.password === password);
        console.log(user);
        if (user) {
            // Si las credenciales son válidas, establecer la sesión
            req.session.username = username;
            next();
        } else {
            res.render('auth/sign-in', { message: 'Usuario o contraseña incorrectos' });
        }
    } else {
        res.render('auth/sign-in', { message: 'Error al verificar las credenciales' });
    }
};

module.exports = signIn;
