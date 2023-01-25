const Biro = require('./model');

const path = 'admin/biro'

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const biro = await Biro.find();
      res.render(`${path}/view_biro`, {
        title: 'Daftar Bidang Kegiatan',
        biro,
        alert,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render(`${path}/create`, {
        title: 'Halaman Tambah Bidang Kegiatan',
        name: req.session.user.name,
        role: req.session.user.role
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let biro = await Biro({ name: name.trim().toUpperCase() })
      await biro.save();

      req.flash('alertMessage', 'Berhasil Menambah Bidang Kegiatan');
      req.flash('alertStatus', 'success');
      res.redirect('/biro');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const biro = await Biro.findById(id)
      res.render(`${path}/edit`, {
        title: 'Halaman Ubah Bidang Kegiatan',
        biro,
        name: req.session.user.name,
        role: req.session.user.role
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  },
  actionEdit: async (req, res) => {
    try {

      const { id } = req.params;
      const { name } = req.body;

      await Biro.findOneAndUpdate({ _id: id }, { name: name.trim().toUpperCase() })

      req.flash('alertMessage', 'Berhasil Mengubah Bidang Kegiatan');
      req.flash('alertStatus', 'success');
      res.redirect('/biro');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  },
  actionDelete: async (req, res) => {
    try {

      const { id } = req.params;
      await Biro.deleteOne({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Bidang Kegiatan');
      req.flash('alertStatus', 'success');
      res.redirect('/biro')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  }
}