const Biro = require('./model');
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');

      const alert = { message: alertMessage, status: alertStatus };

      // console.log(alert);

      const biro = await Biro.find();
      res.render('admin/biro/view_biro', {
        title: 'Halaman Bidang Kegiatan',
        biro,
        alert
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/biro')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render('admin/biro/create', {
        title: 'Halaman Tambah Bidang Kegiatan'
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
      res.render('admin/biro/edit', {
        title: 'Halaman Ubah Bidang Kegiatan',
        biro
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