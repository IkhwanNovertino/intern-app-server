const moment = require('moment');
const Peserta = require('../peserta/model');
const Penempatan = require('../penempatan/model');
const { tglFormatForm, tglFormatSertif } = require('../../utils/utils');
const e = require('connect-flash');

const path = 'admin/rekap'

module.exports = {
  index: async (req, res) => {
    try {
      let tanggal
      res.render(`${path}/view_rekap`, {
        title: 'Halaman Rekap',
        tanggal,
        status: false,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (err) {
      console.log(err);
    }
  },
  viewRekap: async (req, res) => {
    try {
      const { tanggal } = req.query;
      const tgl = tanggal.split(" - ");
      const toDay = new Date;
      const tglAwal = new Date(tgl[0]);
      const tglAkhir = new Date(tgl[1]);

      const pesertaInRange = await Peserta.find({
        tglmulai: { $lt: tglAkhir }, tglselesai: { $gt: tglAwal }
      })
      const pesertaSelesai = pesertaInRange.filter(el => Date.now() > el.tglselesai)
      const pesertaAktif = pesertaInRange.filter(el => Date.now() > el.tglmulai && Date.now() < el.tglselesai)

      const penempatanPeserta = await Penempatan.aggregate(
        [
          {
            $group:
            {
              _id: { biroID: "$biro.id", biroNama: "$biro.nama" },
              countNumberOfMember: {
                $count: {},
              },
            },
          },
        ]
      )
      const penempatanPesertaAktif = await Penempatan.aggregate(
        [
          {
            $match:
            /**
             * query: peserta berdasarkan date-range
             */
            {
              $and: [
                {
                  tglmulai: {
                    $lt: tglAkhir,
                  },
                },
                {
                  tglselesai: {
                    $gt: tglAwal,
                  },
                },
              ],
            },
          },
          {
            $match:
            /**
             * query: peserta yang masih aktif
             */
            {
              $and: [
                {
                  tglmulai: {
                    $lt: toDay,
                  },
                },
                {
                  tglselesai: {
                    $gt: toDay,
                  },
                },
              ],
            },
          },
          {
            $group:
            /**
             * grouping data berdasarkan bidang (biro)
             */
            {
              _id: { biroID: "$biro.id", biroNama: "$biro.nama" },
              anggota: {
                $push: {
                  id: "$_id",
                  tglmulai: "$tglmulai",
                  tglselesai: "$tglselesai",
                  namaPeserta: "$peserta.nama",
                  tglmulaiMagang:
                    "$peserta.tglmulai_magang",
                  tglselesaiMagang:
                    "$peserta.tglselesai_magang",
                },
              },
              countNumberOfMember: {
                $count: {},
              },
            },
          },
        ]
      )
      const penempatanPesertaSelesai = await Penempatan.aggregate(
        [
          {
            $match:
            /**
             * query: Peserta berdasarkan date-range
             */
            {
              $and: [
                {
                  tglmulai: {
                    $lt: tglAkhir,
                  },
                },
                {
                  tglselesai: {
                    $gt: tglAwal,
                  },
                },
              ],
            },
          },
          {
            $match:
            /**
             * query: Peserta yang telah selesai di bidang terkait
             */
            {
              tglselesai: {
                $lte: toDay,
              },
            },
          },
          {
            $group:
            /**
             * grouping data berdasarkan bidang (biro)
             */
            {
              _id: { biroID: "$biro.id", biroNama: "$biro.nama" },
              anggota: {
                $push: {
                  id: "$_id",
                  tglmulai: "$tglmulai",
                  tglselesai: "$tglselesai",
                  namaPeserta: "$peserta.nama",
                  tglmulaiMagang:
                    "$peserta.tglmulai_magang",
                  tglselesaiMagang:
                    "$peserta.tglselesai_magang",
                },
              },
              countNumberOfMember: {
                $count: {},
              },
            },
          },
        ]
      )

      let penempatan = [];

      penempatanPeserta.forEach(el => {
        let data = {
          id: el._id.biroID,
          nama: el._id.biroNama
        }
        penempatan.push(data);
      });

      penempatan.forEach(data1 => {
        penempatanPesertaAktif.forEach(data2 => {
          if (data1.id.toString() === data2._id.biroID.toString()) {
            data1.countAktif = data2.countNumberOfMember
          }
        });

      })

      penempatan.forEach(data1 => {
        penempatanPesertaSelesai.forEach(data2 => {
          if (data1.id.toString() === data2._id.biroID.toString()) {
            data1.countSelesai = data2.countNumberOfMember
          }
        });
      })

      // console.log('penempatan >>>>', penempatan);

      const data = {
        tglAwal,
        tglAkhir,
        pesertaTotal: pesertaInRange.length,
        pesertaAktif: pesertaAktif.length,
        pesertaSelesai: pesertaSelesai.length,
        penempatan,
      }

      if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }

      localStorage.setItem('data-rekap', JSON.stringify(data));
      console.log(localStorage.getItem('data-rekap'));

      res.render(`${path}/view_rekap`, {
        title: 'Halaman Rekap',
        tanggal,
        tglAwal,
        tglAkhir,
        tglFormatSertif,
        data,
        status: true,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      console.log('PESAN ERROR', error);
      res.redirect('/rekap');
    }
  },
  actionPrint: async (req, res) => {
    try {
      const datasFromLocal = localStorage.getItem('data-rekap');
      const datas = JSON.parse(datasFromLocal);
      console.log('data >>>', datas);
      res.render(`${path}/rekap-print`, {
        tglFormatSertif,
        tglFormatForm,
        datas,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (error) {
      console.error(error);
      res.redirect("/rekap");
    }
  }
}