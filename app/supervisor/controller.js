const Supervisor = require('./model');
const User = require('../user/model');

const path = 'admin/pembimbing';

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const supervisor = await Supervisor.find();

      res.render(`${path}/view_pembimbing`, {
        title: 'Daftar Data Supervisor (pembimbing) Kegiatan Magang',
        supervisor,
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
      res.render(`${path}/create`, {
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

      let supervisor = await Supervisor({
        name: name.trim().toUpperCase(),
        nip: nip.replace(/ /gi, ''),
        jabatan: jabatan.trim().toUpperCase()
      })
      await supervisor.save();

      let userSupervisor = await User({
        name: name.trim(),
        username: nip.replaceAll(' ', ''),
        password: nip.replaceAll(' ', ''),
        role: 'pembimbing',
      })
      await userSupervisor.save()

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
      const supervisor = await Supervisor.findById(id)
      res.render(`${path}/edit`, {
        title: 'Halaman Ubah Pembimbing',
        supervisor,
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

      await Supervisor.findOneAndUpdate(
        { _id: id },
        {
          name: name.trim().toUpperCase(),
          nip: nip.replace(/ /gi, ''),
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
      await Supervisor.deleteOne({ _id: id });

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