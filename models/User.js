const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') || this.isNew) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;