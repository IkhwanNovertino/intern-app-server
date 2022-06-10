const moment = require('moment');
const Biro = require('../biro/model');
const Pembimbing = require('../pembimbing/model');
const Sertifikat = require('../sertifikat/model');
const Peserta = require('./model');
const { tglFormat, tglFormatForm } = require('../../utils/utils');

module.exports = {
  index: async (req, res) => {
    try {
      const peserta = await Peserta.find()
        .sort({ createdAt: -1 })
        .populate('biro');

      // let tglFormat = (value) => {
      //   let tgl = moment(value).format("D MMM YYYY");
      //   return tgl
      // }

      res.render('admin/peserta/view_peserta', {
        title: 'Halaman Peserta Magang',
        peserta,
        tglFormat
        
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
        title: 'Halaman Tambah Peserta Magang',
        biro,
        pembimbing,
      })
    } catch (err) {
      console.log(err);
      res.redirect('/peserta');
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, nim, instansi, jurusan, email, tglmulai, tglselesai, pembimbing, biro } = req.body;

      let peserta = await Peserta({
        name : name.trim().toUpperCase(),
        nim : nim.trim(),
        instansi: instansi.trim().toUpperCase(),
        jurusan: jurusan.trim().toUpperCase(),
        email,
        tglmulai,
        tglselesai,
        pembimbing,
        biro
      })
      const pesertaId = peserta._id;
      await peserta.save();
      await Sertifikat({ peserta: pesertaId }).save();
      // res.send(req.body)
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

      // let tglFormat = (value) => {
      //   let tgl = moment(value).format("L");
      //   return tgl
      // }

      res.render('admin/peserta/edit', {
        title: 'Halaman Ubah Peserta Magang',
        pembimbing,
        biro,
        peserta,
        tglFormatForm,
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
          name : name.trim().toUpperCase(),
          nim : nim.trim(),
          instansi: instansi.trim().toUpperCase(),
          jurusan: jurusan.trim().toUpperCase(),
          email,
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