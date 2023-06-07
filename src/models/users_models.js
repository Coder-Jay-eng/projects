const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true, default: 'admin' },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  let hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
