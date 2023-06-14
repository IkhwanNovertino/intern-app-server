const Peserta = require('../peserta/model')
const Pembina = require('../pembina/model');
const Penempatan = require('../penempatan/model')
const { noSertif, tglFormat, tglFormatForm, tglFormatSertif, duration, nipFormat, capitalize } = require('../../utils/utils');

const path = 'admin/sertifikat';

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const peserta = await Peserta
        .find()
        .sort({ createdAt: -1 })
      res.render(`${path}/view_sertifikat`, {
        title: 'Daftar Data Sertifikat Peserta Magang',
        alert,
        peserta,
        tglFormat,
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

      const peserta = await Peserta.findById(id)
      const pembina = await Pembina.find();
      const penempatan = await Penempatan.find({
        "peserta.id": id
      })

      res.render(`${path}/create`, {
        title: 'Halaman Buat Sertifikat',
        tglFormatForm,
        noSertif,
        nipFormat,
        tglFormatSertif,
        penempatan,
        peserta,
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
      const { nilai, noSertifikat, pembina } = req.body;

      const datumPembina = await Pembina.findById(pembina)

      await Peserta.findOneAndUpdate(
        { _id: id },
        {
          sertifikat: {
            noSertifikat,
            nilai,
            tglTerbit: Date.now(),
            pembina: {
              id: pembina,
              name: datumPembina.name,
              nip: datumPembina.nip,
              jabatan: datumPembina.jabatan
            },
            status,
          }
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
      const peserta = await Peserta.findById(id)

      res.render(`${path}/sertifikat`, {
        title: 'Halaman Cetak Sertifikat',
        tglFormatSertif,
        duration,
        nipFormat,
        capitalize,
        peserta,
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
      const peserta = await Peserta.findById(id);
      res.render(`${path}/sertifikat-print`, {
        tglFormatSertif,
        duration,
        nipFormat,
        capitalize,
        peserta
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

      const peserta = await Peserta.findById(id)
      const penempatan = await Penempatan.find({
        "peserta.id": id
      })

      res.render(`${path}/read`, {
        title: 'Halaman Data Sertifikat',
        tglFormatForm,
        nipFormat,
        tglFormatSertif,
        peserta,
        penempatan,
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