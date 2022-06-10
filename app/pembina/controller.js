const Pembina = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const pembina = await Pembina.find();
      res.render('admin/pembina/view_pembina', {
        title: 'Halaman Pembina',
        pembina
      })
    } catch (err) {
      console.log(err);
      res.redirect('/pembina')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/pembina/create', {
        title: 'Halaman Tambah Pembina',
      });
    } catch (err) {
      console.log(err);
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

      res.redirect('/pembina');
    } catch (err) {
      console.log(err);
      res.redirect('/pembina')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const pembina = await Pembina.findById(id)
      res.render('admin/pembina/edit', {
        title: 'Halaman Ubah Pembina',
        pembina
      });
    } catch (err) {
      console.log(err);
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

      res.redirect('/pembina');
    } catch (err) {
      console.log(err);
      res.redirect('/pembina')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Pembina.deleteOne({ _id: id });

      res.redirect('/pembina')
    } catch (err) {
      console.log(err);
      res.redirect('/pembina')
    }
  }
}