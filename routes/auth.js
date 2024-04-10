const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    const savedUser = await user.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: savedUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    savedUser.refreshToken = refreshToken;
    await savedUser.save();

    res.status(201).json({ token, refreshToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ token, refreshToken });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Token refresh endpoint
router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) return res.sendStatus(401);

  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  });
});

module.exports = router;