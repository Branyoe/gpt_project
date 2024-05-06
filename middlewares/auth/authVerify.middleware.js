function authVerify(req, res, next) {
  if (req.session && req.session.username) {
      return next();
  } else {
      return res.redirect('/auth/sign-in'); // Redirige al usuario a la página de inicio de sesión si no está autenticado
  }
}

module.exports = authVerify;
