const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img')
    },
    filename: function (req, file, cb) {
      cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
  })

const uploadType = ['application/pdf', 'application/x-pdf']

const fileFilter = (req, file, cb) => {
    if (uploadType.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  };
  
  module.exports = multer({
    storage, fileFilter
  });