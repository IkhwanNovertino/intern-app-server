const mongoose = require('mongoose');
const autoInc = require('mongoose-sequence')(mongoose)
const moment = require('moment')

let pesertaSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'nama harus diisi']
  },
  noPeserta: {
    type: Number,
    default: 0
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
  tahun: {
    type: String,
  },
  pembimbing: {
    name: {
      type: String,
      require: [true, 'nama harus diisi']
    },
    kontak: {
      noHP: {
        type: String,
        default: "+62"
      }
    }
  }
}, { timestamps: true })

pesertaSchema.pre('save', function (next) {
  this.tahun = moment(this.tglselesai).format('YYYY');
  next();
})

pesertaSchema.plugin(autoInc, { id: 'peserta_seq', inc_field: 'noPeserta', reference_fields: ['tahun'] })

module.exports = mongoose.model('Peserta', pesertaSchema);