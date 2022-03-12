const Pembimbing = require('./model');
const Biro = require('../biro/model');

module.exports = {
  index: async (req, res) => {
    try {
      const pembimbing = await Pembimbing.find()
        .populate('biro');
      res.render('admin/pembimbing/view_pembimbing', {
        pembimbing
      })
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  viewCreate: async (req, res) => {
    const biro = await Biro.find();
    try {
      res.render('admin/pembimbing/create', {
        biro,
      });
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nip, jabatan, biro } = req.body;

      let pembimbing = await Pembimbing({ name, nip, jabatan, biro })
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
      const biro = await Biro.find();
      res.render('admin/pembimbing/edit', {
        pembimbing,
        biro
      });
    } catch (err) {
      console.log(err);
      res.redirect('/pembimbing')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nip, jabatan, biro } = req.body;

      await Pembimbing.findOneAndUpdate({ _id: id }, { name, nip, jabatan, biro })

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