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
  },
  sertifikat: {
    noSertifikat: {
      type: String,
      default: '13/000/SRT/INFO/KOMINFO'
    },
    nilai: {
      type: String,
      enum: ['a', 'b', 'c', 'd'],
      default: 'b'
    },
    tglTerbit: {
      type: Date,
      default: Date.now()
    },
    pembina: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pembina'
      },
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
    },
    status: {
      type: String,
      enum: ['Y', 'N'],
      default: 'N'
    }
  }
}, { timestamps: true })

pesertaSchema.pre('save', function (next) {
  this.tahun = moment(this.tglselesai).format('YYYY');
  next();
})

pesertaSchema.plugin(autoInc, { id: 'peserta_seq', inc_field: 'noPeserta', reference_fields: ['tahun'] })

module.exports = mongoose.model('Peserta', pesertaSchema);