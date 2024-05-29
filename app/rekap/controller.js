const moment = require('moment');
const Peserta = require('../peserta/model');
const Penempatan = require('../penempatan/model');
const Pembina = require('../pembina/model');
const Biro = require('../biro/model')
const { tglFormatForm, tglFormatSertif, nipFormat, capitalize } = require('../../utils/utils');
const e = require('connect-flash');

const path = 'admin/rekap'

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      let tanggal
      res.render(`${path}/view_rekap`, {
        title: 'Halaman Rekap',
        tanggal,
        status: false,
        alert,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/rekap')
    }
  },
  viewRekap: async (req, res) => {
    try {
      const { tanggal } = req.query;
      const tgl = tanggal.split(" - ");
      const toDay = new Date;
      const tglAwal = new Date(tgl[0]);
      const tglAkhir = new Date(tgl[1]);
      const dateParseStart = Date.parse(tglAwal);
      const dateParseEnd = Date.parse(tglAkhir);

      const pesertaInRange = await Peserta.find({
        tglmulai: { $lt: tglAkhir }, tglselesai: { $gt: tglAwal }
      })

      const pesertaProses = pesertaInRange.filter(el => el.tglmulai > Date.now())
      const pesertaAktif = pesertaInRange.filter(el => Date.now() > el.tglmulai && Date.now() < el.tglselesai)
      const pesertaSelesai = pesertaInRange.filter(el => Date.now() > el.tglselesai)

      const penempatanBiro = await Biro.aggregate(
        [
          {
            $lookup: {
              from: "penempatans",
              localField: "_id",
              foreignField: "biro.id",
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $lt: ["$tglmulai_penempatan", dateParseEnd] },
                        { $gt: ["$tglselesai_penempatan", dateParseStart] },
                      ],
                    },
                  },
                },
              ],
              as: "data",
            }
          }
        ]
      );

      let pembina = {}

      for await (const el of Pembina.find()) {
        pembina = el;
      }

      const data = {
        tglAwal,
        tglAkhir,
        pesertaTotal: pesertaInRange.length,
        pesertaAktif: pesertaAktif.length + pesertaProses.length,
        pesertaSelesai: pesertaSelesai.length,
        penempatanBiro,
        pembina
      }

      if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
      localStorage.setItem('data-rekap', JSON.stringify(data));

      res.render(`${path}/view_rekap`, {
        title: 'Halaman Rekap',
        tanggal,
        tglAwal,
        tglAkhir,
        capitalize,
        nipFormat,
        tglFormatSertif,
        data,
        status: true,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      console.log(error);
      res.redirect('/rekap');
    }
  },
  actionPrint: async (req, res) => {
    try {
      const datasFromLocal = localStorage.getItem('data-rekap');
      const datas = JSON.parse(datasFromLocal);

      res.render(`${path}/rekap-print`, {
        tglFormatSertif,
        tglFormatForm,
        capitalize,
        nipFormat,
        datas,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect("/rekap");
    }
  }
}