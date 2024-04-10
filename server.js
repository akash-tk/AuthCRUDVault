require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads')); 

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Multer configuration for file uploads
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});

const upload = multer({
  storage: fileStorageEngine,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // Only allow certain file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    res.status(201).send({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// File download endpoint
app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.resolve(__dirname, 'uploads', filename);
  res.download(filepath, filename, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});

app.use('/api/user', authRoutes); 
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});