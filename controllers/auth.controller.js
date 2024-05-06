const getSignIn = (req, res) => {
  res.render('auth/sign-in', { title: 'Página de inicio', message: '' });
}

const postSignIn = (req, res) => {
  res.redirect('/tasks/');
}

const getSignUp = (req, res) => {
  res.render('auth/sign-up', { title: 'Registro de usuario', message: '' });
}

const postSignOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.redirect('/auth/sign-in');
    }
  });
}

module.exports = {
  getSignIn,
  postSignIn,
  postSignOut,
  getSignUp
};