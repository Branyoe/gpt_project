// middlewares/saveTask.js

const fs = require('fs');
const path = require('path');

function saveTask(req, res, next) {
  const { title, description } = req.body;
  const username = req.session.username; // Suponiendo que tienes el nombre de usuario almacenado en la sesión

  // Ruta al archivo JSON de tareas del usuario
  const tasksFilePath = path.join(__dirname, '..', '..', 'data', `${username}_tasks.json`);

  // Intenta leer el archivo JSON de tareas del usuario
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      // Si el archivo no existe, crea un nuevo array de tareas
      const tasks = [{ id: 1, title, description }];
      saveTasksToFile(tasksFilePath, tasks);
    } else {
      // Si el archivo existe, parsea el contenido y añade la nueva tarea al array de tareas
      const tasks = JSON.parse(data);
      const newTask = { id: tasks.length + 1, title, description };
      tasks.push(newTask);
      saveTasksToFile(tasksFilePath, tasks);
    }

    next();
  });
}

function saveTasksToFile(filePath, tasks) {
  // Guarda el array de tareas en el archivo JSON
  fs.writeFile(filePath, JSON.stringify(tasks, null, 4), 'utf8', err => {
    if (err) {
      console.error('Error al guardar las tareas en el archivo:', err);
    } else {
      console.log('Tarea guardada correctamente en el archivo:', filePath);
    }
  });
}

module.exports = saveTask;
