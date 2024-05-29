const mongoose = require('mongoose');

let penempatanSchema = mongoose.Schema({
  peserta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peserta'
  },
  supervisor: {
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
  tglmulai_penempatan: {
    type: Number,
  },
  tglselesai_penempatan: {
    type: Number,
  },
}, { timestamps: true })

module.exports = mongoose.model('Penempatan', penempatanSchema);