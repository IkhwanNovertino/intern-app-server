const mongoose = require('mongoose');
const autoInc = require('mongoose-sequence')(mongoose)

let pesertaSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'nama harus diisi']
  },
  noPeserta: {
    type: Number,
    default:0
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
  }
}, { timestamps: true })

pesertaSchema.plugin(autoInc, { id: 'peserta_seq', inc_field: 'noPeserta', reference_fields: ['tglmulai'] })

module.exports = mongoose.model('Peserta', pesertaSchema);