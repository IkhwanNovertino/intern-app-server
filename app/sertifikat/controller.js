const Peserta = require('../peserta/model')
const Biro = require('../biro/model');
const Pembina = require('../pembina/model');
const Pembimbing = require('../pembimbing/model');
const Sertifikat = require('./model')
const { tglFormat, noSertif, tglFormatForm, tglFormatSertif, duration } = require('../../utils/utils');
const moment = require('moment');


module.exports = {
  index: async (req, res) => {
    try {
      const sertifikat = await Sertifikat
        .find()
        .sort({ createdAt: -1})
        .populate({
          path: 'peserta',
          populate: {path: 'biro'}
        })

      res.render('admin/sertifikat/view_sertifikat', {
        title: 'Halaman Sertifikat',
        sertifikat
      })
    } catch (err) {
      console.log(err);
    }
  },
  
  viewCreate: async (req, res) => {
    try {
      const { id } = req.params;

      const sertifikat = await Sertifikat
        .findById(id)
        .populate({
          path: 'peserta',
          populate: { path: 'biro pembimbing' }
        })

      // const biro = await Biro.find();
      // const pembimbing = await Pembimbing.find();
      const pembina = await Pembina.find();

      res.render('admin/sertifikat/create', {
        title: 'Halaman Buat Sertifikat',
        tglFormatForm,
        noSertif,
        sertifikat,
        // biro,
        pembina,
        // pembimbing
      })

    } catch (err) {
      console.log(err);
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { id } = req.params;
      const {status} = req.query
      
      const { nilai, tglTerbit, noSertifikat, pembina } = req.body;

      await Sertifikat.findOneAndUpdate(
        { _id: id },
        {
          nilai,
          tglTerbit,
          pembina,
          noSertifikat,
          status
        }
      )
      res.redirect('/sertifikat');
    } catch (err) {
      console.log(err);
    }
  },
  viewPrint: async (req, res) => {
    try {
      const { id } = req.params;
      const sertifikat = await Sertifikat.findById(id)
        .populate('peserta pembina')
      res.render('admin/sertifikat/sertifikat', {
        title: 'Halaman Cetak Sertifikat',
        tglFormatSertif,
        duration,
        sertifikat
      })
    } catch (err) {
      console.log(err);
    }
  },
  actionPrint: async (req, res) => {
    try {
      const { id } = req.params;
      const sertifikat = await Sertifikat.findById(id)
        .populate('peserta pembina')
      res.render('admin/sertifikat/sertifikat-print', {
        tglFormatSertif,
        duration,
        sertifikat
      })
    } catch (err) {
      console.log(err);
    }
  },
  viewRead: async (req, res) => {
    try {
      const { id } = req.params;

      const sertifikat = await Sertifikat
        .findById(id)
        .populate({
          path: 'peserta',
          populate: { path: 'biro pembimbing' }
        })
        .populate('pembina')
      
      const pembina = await Pembina.find()
      const pembimbing = await Pembimbing.find()
      const biro = await Biro.find()
      
      res.render('admin/sertifikat/read', {
        title: 'Halaman Data Sertifikat',
        tglFormatForm,
        sertifikat,
        pembina,
        pembimbing,
        biro
      })
    } catch (err) {
      console.log(err);
    }
  }
}