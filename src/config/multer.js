const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    Storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, (__dirname, '..', '..', 'temp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, Hash) => {
                if (err) cb(err);
                const fileName = `${crypto.Hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName)
            })
        }
    }),
    limits:{
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ]

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        }else {
            cb(new Error('Invalid file type'))
        }
    }
}