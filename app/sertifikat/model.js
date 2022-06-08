const mongoose = require('mongoose');

let sertifikatSchema = mongoose.Schema({
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
  peserta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peserta'
  },
  pembina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pembina'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'N'
  }
}, { timestamps: true });

module.exports = mongoose.model('Sertifikat', sertifikatSchema);