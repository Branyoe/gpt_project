const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const AuthRouter = require('./routes/auth.routes');
const TaskRouter = require('./routes/tasks.routes');
const UsersRouter = require('./routes/users.routes');
// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analizar datos de formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de express-session
app.use(session({
    secret: 'mi_secreto', // Cambia esto a una cadena secreta más segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } // Ajusta las opciones de cookie según sea necesario
}));

app.use('/auth', AuthRouter);
app.use('/tasks', TaskRouter);
app.use('/users', UsersRouter)

// // Ruta para la página principal
// app.get('/', (req, res) => {
//     res.render('auth/sign-in', { title: 'Página de inicio', message: '' });
// });

// // Ruta para la página de inicio
// app.get('/home', (req, res) => {
//     if (!req.session.username) {
//         res.redirect('/');
//     } else {
//         res.render('home', { username: req.session.username });
//     }
// });

// // Ruta para el inicio de sesión
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     console.log('USERNAME:', process.env.USER);
//     console.log('PASSWORD:', process.env.PASSWORD);
//     console.log('Credenciales ingresadas:', username, password);


//     if (!username || !password) {
//         res.render('auth/sign-in', { message: 'Por favor completa los campos' });
//     } else if (username === process.env.USER && password === process.env.PASSWORD) {
//         req.session.username = username;
//         res.redirect('/home');
//     } else {
//         res.render('auth/sign-in', { message: 'Usuario o contraseña incorrectos' });
//     }
// });

// // Ruta para cerrar sesión
// app.get('/logout', (req, res) => {
//     req.session.destroy(err => {
//         if (err) {
//             console.error('Error al cerrar sesión:', err);
//             res.status(500).send('Error al cerrar sesión');
//         } else {
//             res.redirect('/');
//         }
//     });
// });

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
