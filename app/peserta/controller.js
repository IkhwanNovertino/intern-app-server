const moment = require('moment');
const Biro = require('../biro/model');
const Pembimbing = require('../pembimbing/model');
const Peserta = require('./model');

module.exports = {
  index: async (req, res) => {
    try {
      const peserta = await Peserta.find()
        .populate('biro');

      let tglFormat = (value) => {
        let tgl = moment(value).format("D MMM YYYY");
        return tgl
      }

      res.render('admin/peserta/view_peserta', {
        peserta,
        tglFormat,
      })
    } catch (err) {
      console.log(err);
    }
  },
  viewCreate: async (req, res) => {
    try {
      const biro = await Biro.find();
      const pembimbing = await Pembimbing.find();

      res.render('admin/peserta/create', {
        biro,
        pembimbing
      })
    } catch (err) {
      console.log(err);
      res.redirect('/peserta');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nim, instansi, jurusan, email, tglmulai, tglselesai, pembimbing, biro } = req.body;

      let peserta = await Peserta({ name, nim, instansi, jurusan, email, tglmulai, tglselesai, pembimbing, biro })
      await peserta.save();

      res.redirect('/peserta');
    } catch (err) {
      console.log(err);
      res.redirect('/peserta')
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const peserta = await Peserta.findById(id)
      const biro = await Biro.find();
      const pembimbing = await Pembimbing.find();

      let tglFormat = (value) => {
        let tgl = moment(value).format("L");
        return tgl
      }

      res.render('admin/peserta/edit', {
        pembimbing,
        biro,
        peserta,
        tglFormat
      });
    } catch (err) {
      console.log(err);
      res.redirect('/peserta')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nim, instansi, jurusan, email,
        tglmulai, tglselesai, pembimbing, biro } = req.body;

      // res.send(req.body)
      await Peserta.findOneAndUpdate(
        { _id: id },
        {
          name, nim, instansi, jurusan, email,
          tglmulai, tglselesai, pembimbing, biro
        })

      res.redirect('/peserta');
    } catch (err) {
      console.log(err);
      res.redirect('/peserta')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Peserta.deleteOne({ _id: id });

      res.redirect('/peserta')
    } catch (err) {
      console.log(err);
      res.redirect('/peserta')
    }
  }
}