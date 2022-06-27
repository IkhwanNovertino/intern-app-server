const moment = require('moment');
const Biro = require('../biro/model');
const Pembimbing = require('../pembimbing/model');
const Sertifikat = require('../sertifikat/model');
const Peserta = require('./model');
const { tglFormat, tglFormatForm } = require('../../utils/utils');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const peserta = await Peserta.find()
        .sort({ createdAt: -1 })
        .populate('biro');
      
      res.render('admin/peserta/view_peserta', {
        title: 'Halaman Peserta Magang',
        peserta,
        tglFormat,
        alert,
        name: req.session.user.name
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta')
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
        name: req.session.user.name
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
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
      req.flash('alertMessage', 'Berhasil Menambahkan Data Peserta');
      req.flash('alertStatus', 'success');
      res.redirect('/peserta');
    } catch (error) {
      req.flash('alertMessage', 'Data peserta tidak tersimpan. pastikan semua field terisi');
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta')
    }
  },

  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const peserta = await Peserta.findById(id)
      const biro = await Biro.find();
      const pembimbing = await Pembimbing.find();

      res.render('admin/peserta/edit', {
        title: 'Halaman Ubah Peserta Magang',
        pembimbing,
        biro,
        peserta,
        tglFormatForm,
        name: req.session.user.name
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nim, instansi, jurusan, email,
        tglmulai, tglselesai, pembimbing, biro } = req.body;

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

        req.flash('alertMessage', 'Berhasil Mengubah Data Peserta');
        req.flash('alertStatus', 'success');
      res.redirect('/peserta');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Peserta.deleteOne({ _id: id });
      await Sertifikat.deleteOne({ peserta: id });

      req.flash('alertMessage', 'Berhasil Menghapus Data Peserta');
      req.flash('alertStatus', 'success');
      res.redirect('/peserta')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta')
    }
  }
}