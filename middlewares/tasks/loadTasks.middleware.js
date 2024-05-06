const fs = require('fs');
const path = require('path');

function loadTasks(req, res, next) {
  const username = req.session.username; // Suponiendo que tienes el nombre de usuario almacenado en la sesión

  // Ruta al archivo JSON de tareas
  const tasksFilePath = path.join(__dirname, '..', '..', 'data', `${username}_tasks.json`);

  // Intenta cargar el archivo JSON de tareas
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      // Si hay un error al cargar el archivo, pasa el control a Express para manejarlo
      return next(err);
    }

    // Parsea el contenido del archivo JSON
    const tasks = JSON.parse(data);

    // Adjunta las tareas al objeto req para que estén disponibles en el controlador
    req.tasks = tasks;

    // Continúa con la solicitud
    next();
  });
}

module.exports = loadTasks;
