const Pembimbing = require('./model');
const User = require('../user/model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const pembimbing = await Pembimbing.find();

      res.render('admin/pembimbing/view_pembimbing', {
        title: 'Halaman Pembimbing',
        pembimbing,
        alert,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/pembimbing/create', {
        title: 'Halaman Tambah Pembimbing',
        name: req.session.user.name,
        role: req.session.user.role
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nip, jabatan } = req.body;

      let pembimbing = await Pembimbing({
        name: name.trim().toUpperCase(),
        nip: nip.replaceAll(' ', ''),
        jabatan: jabatan.trim().toUpperCase()
      })
      await pembimbing.save();

      let userPembimbing = await User({
        name: name.trim(),
        username: nip.replaceAll(' ', ''),
        password: nip.replaceAll(' ', ''),
        role: 'pembimbing',
      })
      await userPembimbing.save()

      req.flash('alertMessage', 'Berhasil Menambah Data Pembimbing');
      req.flash('alertStatus', 'success');
      res.redirect('/pembimbing');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const pembimbing = await Pembimbing.findById(id)
      res.render('admin/pembimbing/edit', {
        title: 'Halaman Ubah Pembimbing',
        pembimbing,
        name: req.session.user.name,
        role: req.session.user.role
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nip, jabatan } = req.body;

      await Pembimbing.findOneAndUpdate(
        { _id: id },
        {
          name: name.trim().toUpperCase(),
          nip: nip.replaceAll(' ', ''),
          jabatan: jabatan.trim().toUpperCase()
      })

      req.flash('alertMessage', 'Berhasil Mengubah Data Pembimbing');
      req.flash('alertStatus', 'success');
      res.redirect('/pembimbing');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Pembimbing.deleteOne({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Data Pembimbing');
      req.flash('alertStatus', 'success');
      res.redirect('/pembimbing')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  }
}