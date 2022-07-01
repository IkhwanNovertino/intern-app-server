const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

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

//untuk membuat passwordnya di hash
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
})

module.exports = mongoose.model('User', userSchema);