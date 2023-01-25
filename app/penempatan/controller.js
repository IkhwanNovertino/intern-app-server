const Penempatan = require('./model');
const Peserta = require("../peserta/model");
const Supervisor = require("../supervisor/model");
const Biro = require("../biro/model");
const { tglFormat, tglFormatForm } = require("../../utils/utils");

const path = 'admin/penempatan';

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const penempatan = await Penempatan.find()
        .sort({ createdAt: -1 })

      res.render(`${path}/view_penempatan`, {
        title: 'Daftar Data Penempatan Peserta Magang',
        penempatan,
        alert,
        tglFormat,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/penempatan')
    }
  },
  viewCreate: async (req, res) => {
    try {
      const peserta = await Peserta.find().sort({ createdAt: -1 });
      const supervisor = await Supervisor.find();
      const biro = await Biro.find();

      res.render(`${path}/create`, {
        title: 'Halaman Tambah Penempatan peserta',
        peserta,
        supervisor,
        biro,
        name: req.session.user.name,
        role: req.session.user.role
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/penempatan')
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { peserta, supervisor, biro, tglmulai, tglselesai } = req.body;

      const datumPeserta = await Peserta.findOne({ _id: peserta });
      const datumSupervisor = await Supervisor.findOne({ _id: supervisor });
      const datumBiro = await Biro.findOne({ _id: biro });

      const penempatan = await Penempatan({
        tglmulai,
        tglselesai,
        peserta: {
          id: peserta,
          nama: datumPeserta.name,
          nim: datumPeserta.nim,
          instansi: datumPeserta.instansi,
          jurusan: datumPeserta.jurusan,
          tglmulai_magang: datumPeserta.tglmulai,
          tglselesai_magang: datumPeserta.tglselesai,
        },
        supervisor: {
          id: supervisor,
          nama: datumSupervisor.name,
          nip: datumSupervisor.nip,
          jabatan: datumSupervisor.jabatan,
        },
        biro: {
          id: biro,
          nama: datumBiro.name,
        }
      })
      await penempatan.save();

      req.flash('alertMessage', 'Berhasil Menambah Data Penempatan Peserta Magang');
      req.flash('alertStatus', 'success');
      res.redirect('/penempatan');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/penempatan')
    }
  },
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const penempatan = await Penempatan.findById(id)
      
      res.render(`${path}/detail`, {
        title: 'Halaman Detail Penempatan Magang Detail',
        tglFormatForm,
        penempatan,
        name: req.session.user.name,
        role: req.session.user.role
      });
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/pembimbing')
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Penempatan.deleteOne({ _id: id });

      req.flash('alertMessage', 'Berhasil Menghapus Data Penempatan Peserta');
      req.flash('alertStatus', 'success');
      res.redirect('/penempatan')
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/penempatan')
    }
  }
}