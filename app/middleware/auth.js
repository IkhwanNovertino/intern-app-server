module.exports = {
  isLoginAdmmin: async (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', 'Sesi anda telah berakhir, silakan masuk kembali.');
      req.flash('alertStatus', 'warning');
      res.redirect('/');
    } else {
      next();
    }
  }
}