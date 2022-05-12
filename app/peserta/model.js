const mongoose = require('mongoose');

let pesertaSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'nama harus diisi']
  },
  nim: {
    type: String,
    require: [true, 'no. induk harus diisi']
  },
  jurusan: {
    type: String,
    require: [true, 'jurusan harus diisi']
  },
  instansi: {
    type: String,
    require: [true, 'instansi/ asal sekolah harus diisi']
  },
  email: {
    type: String,
  },
  tglmulai: {
    type: Date,
    default: Date.now()
  },
  tglselesai: {
    type: Date,
    default: Date.now()
  },
  pembimbing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pembimbing'
  },
  biro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Biro'
  },
  pembina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pembina'
  }

}, { timestamps: true })

module.exports = mongoose.model('Peserta', pesertaSchema);