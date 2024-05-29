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

      const penempatan = await Penempatan
        .find()
        .populate('peserta')
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
      const toDay = Date.now()

      const peserta = await Peserta.aggregate([
        {
          $match: {
            tglselesai: { $gt: toDay }
          }
        },
        {
          $lookup: {
            from: "penempatans",
            localField: "_id",
            foreignField: "peserta",
            pipeline: [
              { $sort: { createdAt: -1 } },
              { $addFields: {} }
            ],
            as: "dataAktif"
          }
        },
        {
          $sort: {
            createdAt: -1
          }
        }
      ]);

      const pesertaString = JSON.stringify(peserta)

      const supervisor = await Supervisor.find();
      const biro = await Biro.find();

      res.render(`${path}/create`, {
        title: 'Halaman Tambah Penempatan peserta',
        peserta,
        pesertaString,
        supervisor,
        biro,
        toDay,
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
      const { peserta, waktuPenempatan, supervisor, biro } = req.body;


      const datumPeserta = await Peserta.findOne({ _id: peserta });
      const datumSupervisor = await Supervisor.findOne({ _id: supervisor });
      const datumBiro = await Biro.findOne({ _id: biro });
      const tgl = waktuPenempatan.split(" - ");

      let penempatan = new Penempatan({
        tglmulai_penempatan: Date.parse(tgl[0]),
        tglselesai_penempatan: Date.parse(tgl[1]),
        peserta: peserta,
        supervisor: {
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
      const penempatan = await Penempatan.findById(id).populate('peserta')

      console.log(penempatan);

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