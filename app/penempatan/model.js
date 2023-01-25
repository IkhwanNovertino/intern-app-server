const mongoose = require('mongoose');

let penempatanSchema = mongoose.Schema({
  peserta: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Peserta'
    },
    nama: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data peserta"]
    },
    nim: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data peserta"]
    },
    instansi: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data peserta"]
    },
    jurusan: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data peserta"]
    },
    tglmulai_magang: {
      type: Date,
      default: Date.now()
    },
    tglselesai_magang: {
      type: Date,
      default: Date.now()
    },
  },
  supervisor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supervisor'
    },
    nama: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data supervisor"]
    },
    nip: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data supervisor"]
    },
    jabatan: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data supervisor"]
    },
  },
  biro: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Biro'
    },
    nama: {
      type: String,
      require: [true, "Ada kendala pada pengambilan data bidang kegiatan"]
    },
  },
  tglmulai: {
    type: Date,
    default: Date.now()
  },
  tglselesai: {
    type: Date,
    default: Date.now()
  },
}, { timestamps: true })

module.exports = mongoose.model('Penempatan', penempatanSchema);