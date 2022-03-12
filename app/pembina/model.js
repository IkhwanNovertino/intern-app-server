const mongoose = require('mongoose');

let pembinaSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'nama harus diisi']
  },
  nip: {
    type: String,
    require: [true, 'no. induk pegawai harus diisi']
  },
  jabatan: {
    type: String,
    require: [true, 'jabatan harus diisi']
  }
}, { timestamps: true })

module.exports = mongoose.model('Pembina', pembinaSchema);