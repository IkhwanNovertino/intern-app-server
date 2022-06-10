const moment = require('moment');
const Biro = require('../biro/model');
const Pembimbing = require('../pembimbing/model');
const Sertifikat = require('../sertifikat/model');
const Peserta = require('../peserta/model');
const { tglFormat, tglFormatForm } = require('../../utils/utils');

module.exports = {
  index: async (req, res) => {
    try {
      // const biro = await Biro.find();
      const peserta = await Peserta.find()
        .populate('biro').sort({ createdAt: -1});
      // console.log("biro >>>>>");
      // console.log(biro);
      // console.log("element biro for-in >>>>");
      // for (const key in biro) {
      //   if (Object.hasOwnProperty.call(biro, key)) {
      //     const element = biro[key];
      //     console.log(element);
      //   }
      // }
      // console.log("element biro for-of >>>>>");
      // for (const property of biro) {
      //   console.log(`id ${property._id} ==> ${property.name}`);
      // }

      // untuk melihat status peserta (proses, aktif, selesai)
      // peserta.forEach(peserta => {
      //   if (Date.now() < peserta.tglmulai) {
      //     console.log("proses");
      //   } else if (Date.now() >= peserta.tglmulai && Date.now() <= peserta.tglselesai){
      //     console.log("aktif");
      //   } else {
      //     console.log("selesai");
      //   }
      // });

      // Menghitung peserta aktif
      let pesertaAktif = peserta.filter(val => Date.now() >= val.tglmulai && Date.now() <= val.tglselesai)
      // console.log(`Total peserta magang = ${peserta.length}`);
      // console.log(`jumlah peserta aktif = ${pesertaAktif.length}`);
      res.render('index', {
        title: 'Halaman Dashboard',
        peserta,
        pesertaAktif,
        // biro,
        tglFormat
      })
    } catch (err) {
      console.log(err);
    }
  }
}