const moment = require('moment');
const Peserta = require('../peserta/model');
const { tglFormat } = require('../../utils/utils');

module.exports = {
  index: async (req, res) => {
    try {
      const peserta = await Peserta.find()
        .populate('biro').sort({ createdAt: -1});

      // Menghitung peserta aktif
      let pesertaAktif = peserta.filter(val => Date.now() >= val.tglmulai && Date.now() <= val.tglselesai)

      res.render('index', {
        title: 'Halaman Dashboard',
        peserta,
        pesertaAktif,
        tglFormat,
        name: req.session.user.name,
        role: req.session.user.role
      })
    } catch (err) {
      console.log(err);
    }
  }
}