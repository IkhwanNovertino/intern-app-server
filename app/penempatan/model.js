const mongoose = require('mongoose');

let penempatanSchema = mongoose.Schema({
  historyPenempatan: {
    peserta: {
      nama: { type: String, require: [true, "Ada kendala pada pengambilan data peserta"] },
      nim: { type: String, require: [true, "Ada kendala pada pengambilan data peserta"] },
      instansi: { type: String, require: [true, "Ada kendala pada pengambilan data peserta"] },
      jurusan: { type: String, require: [true, "Ada kendala pada pengambilan data peserta"] },
      tglmulai_magang: { type: Date, default: Date.now() },
      tglselesai_magang: { type: Date, default: Date.now() },
    },
    supervisor: {
      nama: { type: String, require: [true, "Ada kendala pada pengambilan data supervisor"] },
      nip: { type: String, require: [true, "Ada kendala pada pengambilan data supervisor"] },
      jabatan: { type: String, require: [true, "Ada kendala pada pengambilan data supervisor"] },
    },
    biro: {
      nama: { type: String, require: [true, "Ada kendala pada pengambilan data bidang kegiatan"] },
    }
  },
  peserta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peserta'
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor'
  },
  biro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Biro'
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