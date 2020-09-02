const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'src/img')
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}-${Date.now()}.png`);
    }
});

const upload = multer({
    storage
});


module.exports = upload;