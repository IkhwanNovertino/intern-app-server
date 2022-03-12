const Pembina = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const pembina = await Pembina.find();
      res.render('admin/pembina/view_pembina', {
        pembina
      })
    } catch (err) {
      console.log(err);
      res.redirect('/pembina')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/pembina/create');
    } catch (err) {
      console.log(err);
      res.redirect('/pembina')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nip, jabatan } = req.body;

      let pembina = await Pembina({ name, nip, jabatan })
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

      await Pembina.findOneAndUpdate({ _id: id }, { name, nip, jabatan })

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