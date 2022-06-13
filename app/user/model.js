const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'username harus diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi']
  },
  password: {
    type: String,
    require: [true, 'Password harus diisi']
  },
  role: {
    type: String,
    enum: ['admin', 'pembimbing'],
    default: 'admin'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  }

}, { timestamps: true }) // untuk menambahkan createdAt dan updateAt di document(table)

module.exports = mongoose.model('User', userSchema);