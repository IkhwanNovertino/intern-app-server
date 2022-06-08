const Pembimbing = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const pembimbing = await Pembimbing.find();

      res.render('admin/pembimbing/view_pembimbing', {
        pembimbing
      })
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/pembimbing/create', {
      });
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nip, jabatan } = req.body;

      let pembimbing = await Pembimbing({
        name: name.trim(),
        nip: nip.replaceAll(' ', ''),
        jabatan: jabatan.trim().toUpperCase()
      })
      await pembimbing.save();

      res.redirect('/pembimbing');
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const pembimbing = await Pembimbing.findById(id)
      res.render('admin/pembimbing/edit', {
        pembimbing,
      });
    } catch (err) {
      console.log(err);
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

      res.redirect('/pembimbing');
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Pembimbing.deleteOne({ _id: id });

      res.redirect('/pembimbing')
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  }
}