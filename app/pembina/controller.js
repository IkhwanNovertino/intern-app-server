const Pembina = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const pembina = await Pembina.find();
      res.render('admin/pembina/view_pembina', {
        title: 'Halaman Pembina',
        pembina,
        alert,
        name: req.session.user.name
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembina')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/pembina/create', {
        title: 'Halaman Tambah Pembina',
        name: req.session.user.name
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembina')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nip, jabatan } = req.body;

      let pembina = await Pembina({
        name: name.trim().toUpperCase(),
        nip: nip.replaceAll(' ', ''),
        jabatan: jabatan.trim().toUpperCase()
      })
      await pembina.save();

      req.flash('alertMessage', 'Berhasil Menambah Data Pembina');
      req.flash('alertStatus', 'success');
      res.redirect('/pembina');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembina')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const pembina = await Pembina.findById(id)
      res.render('admin/pembina/edit', {
        title: 'Halaman Ubah Pembina',
        pembina,
        name: req.session.user.name
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembina')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nip, jabatan } = req.body;

      await Pembina.findOneAndUpdate(
        { _id: id },
        {
          name: name.trim().toUpperCase(),
          nip: nip.replaceAll(' ', ''),
          jabatan: jabatan.trim().toUpperCase()
        })

        req.flash('alertMessage', 'Berhasil Mengubah Data Pembina');
        req.flash('alertStatus', 'success');
      res.redirect('/pembina');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembina')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Pembina.deleteOne({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Data Pembina');
      req.flash('alertStatus', 'success');
      res.redirect('/pembina')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembina')
    }
  }
}