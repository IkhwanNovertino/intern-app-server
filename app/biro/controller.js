const Biro = require('./model');
module.exports = {
  index: async (req, res) => {
    try {
      const biro = await Biro.find();
      res.render('admin/biro/view_biro', {
        biro
      })
    } catch (err) {
      console.log(err);
      res.redirect('/biro')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/biro/create');
    } catch (err) {
      console.log(err);
      res.redirect('/biro')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;

      let biro = await Biro({ name })
      await biro.save();

      console.log("Biro >>");
      console.log(biro);
      res.redirect('/biro');
    } catch (err) {
      console.log(err);
      res.redirect('/biro')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const biro = await Biro.findById(id)
      res.render('admin/biro/edit', {
        biro
      });
    } catch (err) {
      console.log(err);
      res.redirect('/biro')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Biro.findOneAndUpdate({ _id: id }, { name })

      res.redirect('/biro');
    } catch (err) {
      console.log(err);
      res.redirect('/biro')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Biro.deleteOne({ _id: id });

      res.redirect('/biro')
    } catch (err) {
      console.log(err);
      res.redirect('/biro')
    }
  }
}