const multer = require('multer');
const path = require('path');

// Define o destino e o nome do arquivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // cria uma pasta chamada "uploads"
  },
  filename: (req, file, cb) => {
    const nome = `${Date.now()}-${file.originalname}`;
    cb(null, nome);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

module.exports = upload;
