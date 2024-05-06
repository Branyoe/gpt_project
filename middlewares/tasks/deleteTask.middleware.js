// middlewares/deleteTask.js

const fs = require('fs');
const path = require('path');

function deleteTask(req, res, next) {
    const taskId = req.params.id; // Suponiendo que el ID de la tarea está en los parámetros de la URL
    const username = req.session.username; // Suponiendo que tienes el nombre de usuario almacenado en la sesión

    // Ruta al archivo JSON de tareas del usuario
    const tasksFilePath = path.join(__dirname, '..', '..','data', `${username}_tasks.json`);

    // Leer el archivo JSON de tareas del usuario
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) {
            // Si hay un error al leer el archivo, pasa el control a Express para manejarlo
            return next(err);
        }

        // Parsear el contenido del archivo JSON
        const tasks = JSON.parse(data);

        // Filtrar la tarea a eliminar por su ID
        const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId));

        // Guardar las tareas actualizadas en el archivo JSON
        saveTasksToFile(tasksFilePath, updatedTasks);

        next();
    });
}

function saveTasksToFile(filePath, tasks) {
    // Guardar el array de tareas en el archivo JSON
    fs.writeFile(filePath, JSON.stringify(tasks, null, 4), 'utf8', err => {
        if (err) {
            console.error('Error al guardar las tareas en el archivo:', err);
        } else {
            console.log('Tarea eliminada correctamente en el archivo:', filePath);
        }
    });
}

module.exports = deleteTask;
