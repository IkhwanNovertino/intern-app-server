const Peserta = require('../peserta/model')
const Biro = require('../biro/model');
const Pembina = require('../pembina/model');
const Pembimbing = require('../supervisor/model');
const Sertifikat = require('./model')
const { noSertif, tglFormatForm, tglFormatSertif, duration, nipFormat, capitalize } = require('../../utils/utils');
const moment = require('moment');

const path = 'admin/sertifikat';


module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const sertifikat = await Sertifikat
        .find()
        .sort({ createdAt: -1 })
        .populate({
          path: 'peserta',
          populate: { path: 'biro' }
        })

      console.log(sertifikat);
      res.render(`${path}/view_sertifikat`, {
        title: 'Halaman Sertifikat',
        alert,
        sertifikat,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sertifikat')
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

      const pembina = await Pembina.find();

      res.render(`${path}/create`, {
        title: 'Halaman Buat Sertifikat',
        tglFormatForm,
        noSertif,
        sertifikat,
        pembina,
        name: req.session.user.name,
        role: req.session.user.role
      })

    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sertifikat')
    }
  },

  actionCreate: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query

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

      req.flash('alertMessage', 'Berhasil Membuat sertifikat');
      req.flash('alertStatus', 'success');
      res.redirect('/sertifikat');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sertifikat')
    }
  },

  viewPrint: async (req, res) => {
    try {
      const { id } = req.params;
      const sertifikat = await Sertifikat.findById(id)
        .populate('peserta pembina')

      res.render(`${path}/sertifikat`, {
        title: 'Halaman Cetak Sertifikat',
        tglFormatSertif,
        duration,
        nipFormat,
        capitalize,
        sertifikat,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sertifikat')
    }
  },
  actionPrint: async (req, res) => {
    try {
      const { id } = req.params;
      const sertifikat = await Sertifikat.findById(id)
        .populate('peserta pembina')
      res.render(`${path}/sertifikat-print`, {
        tglFormatSertif,
        duration,
        nipFormat,
        capitalize,
        sertifikat
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sertifikat')
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

      res.render(`${path}/read`, {
        title: 'Halaman Data Sertifikat',
        tglFormatForm,
        sertifikat,
        pembina,
        pembimbing,
        biro,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/sertifikat')
    }
  }
}