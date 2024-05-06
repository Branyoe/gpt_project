const getTasks = (req, res) => {
  res.render('tasks/tasks', {
    tasks: req.tasks
  });
}

const getNewTask = (req, res) => {
  res.render('tasks/new-task');
}

const postNewTask = (req, res) => {
  res.redirect('/tasks/');
}

const deleteTask = (req, res) => {
  res.redirect('/tasks/');
}

module.exports = {
  getTasks,
  getNewTask,
  postNewTask,
  deleteTask
};