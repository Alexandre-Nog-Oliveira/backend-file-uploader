const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const path = require('path')
const crypto = require('crypto')

const StorageTypes = {
    local:  multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, (__dirname, '..', '..', 'temp', 'uploads'))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, Hash) => {
                if (err) cb(err);
                 file.key = `${crypto.Hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName)
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'backend-file-uploader',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) =>{
            crypto.randomBytes(16, (err, Hash) => {
                if (err) cb(err);
                const fileName = `${crypto.Hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName)
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
    Storage: StorageTypes['local'],
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