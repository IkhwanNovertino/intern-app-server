const Peserta = require('./model');
const Penempatan = require('../penempatan/model');
const { tglFormat, tglFormatForm } = require('../../utils/utils');

const path = 'admin/peserta';

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const peserta = await Peserta.find()
        .sort({ createdAt: -1 })
        .populate('biro');

      res.render(`${path}/view_peserta`, {
        title: 'Daftar Data Peserta Magang',
        peserta,
        tglFormat,
        alert,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta')
    }
  },
  viewCreate: async (req, res) => {
    try {

      res.render(`${path}/create`, {
        title: 'Halaman Tambah Peserta Magang',
        tglFormatForm,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/peserta');
    }
  },

  actionCreate: async (req, res) => {
    try {
      const {
        name, nim, instansi, jurusan, email,
        tglmulai, tglselesai, pembimbing, pembimbingKontak
      } = req.body;

      let peserta = await Peserta({
        name: name.trim().toUpperCase(),
        nim: nim.trim(),
        instansi: instansi.trim().toUpperCase(),
        jurusan: jurusan.trim().toUpperCase(),
        email,
        tglmulai: Date.parse(tglmulai),
        tglselesai: Date.parse(tglselesai),
        pembimbing: {
          name: pembimbing.trim().toUpperCase(),
          kontak: {
            noHP: pembimbingKontak
          }
        }
      })
      await peserta.save();

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

      res.render(`${path}/edit`, {
        title: 'Halaman Ubah Peserta Magang',
        peserta,
        tglFormatForm,
        name: req.session.user.name,
        role: req.session.user.role
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
        tglmulai, tglselesai, pembimbing, pembimbingKontak } = req.body;

      await Peserta.findOneAndUpdate(
        { _id: id },
        {
          name: name.trim().toUpperCase(),
          nim: nim.trim(),
          instansi: instansi.trim().toUpperCase(),
          jurusan: jurusan.trim().toUpperCase(),
          email,
          tglmulai: Date.parse(tglmulai),
          tglselesai: Date.parse(tglselesai),
          pembimbing: {
            name: pembimbing.trim().toUpperCase(),
            kontak: {
              noHP: pembimbingKontak
            }
          }
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

      await Penempatan.deleteMany({ peserta: id })
      await Peserta.deleteOne({ _id: id });

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