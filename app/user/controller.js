const User = require('./model')
const bcrypt = require('bcryptjs');

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/user/view_signin', {
          alert
        })
      } else {
        res.redirect('/dashboard')
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/')
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const check = await User.findOne({ username: username });

      if (check) {
        if (check.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, check.password)
          if (checkPassword) {
            req.session.user = {
              id: check._id,
              username: check.username,
              name: check.name,
              status: check.status,
              role: check.role
            }
            res.redirect('/dashboard')
          } else {
            req.flash('alertMessage', 'Kata sandi yang diinputkan salah');
            req.flash('alertStatus', 'danger');
            res.redirect('/')
          }
        } else {
          req.flash('alertMessage', 'Mohon maaf status anda belum aktif');
          req.flash('alertStatus', 'danger');
          res.redirect('/')
        }
      } else {
        req.flash('alertMessage', 'Username yang diinputkan salah');
        req.flash('alertStatus', 'danger');
        res.redirect('/')
      }
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/')
    }
  },
  actionLogout: (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
}