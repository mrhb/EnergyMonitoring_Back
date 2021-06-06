/**
 * @author MjImani
 * phone : +989035074205
 */
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config');
const Response = require('../../middleware/response/response-handler');
const APP_DIR = path.dirname(require.main.filename);

exports.upload = async (req, res, next) => {

    const path = APP_DIR+'\\'+ getPath(req.user.id);
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, {recursive: true});
    }
    req.uploadDir =path;
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            res.send(Response(path + '/' + req.file.originalname));
        }
    })
};


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('req.uploadDir ' + req.uploadDir);
        // Uploads is the Upload_folder_name
        cb(null, req.uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

let upload = multer({
    storage: storage,
    limits: {fileSize: config.UploadMaxSize},
    fileFilter: function (req, file, cb) {
        // Set the fileTypes, it is optional
        let fileTypes = /jpeg|jpg|png/;
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following fileTypes - " + fileTypes);
    }
}).single("file");

function getPath(userId) {
    return (config.UploadDir + '/' + userId + '/' + myDate() + '/' + new mongoose.Types.ObjectId());
}

function myDate() {
    const date = new Date();
    let month = date.getMonth() + 1;
    if (month.toString().length === 1) {
        month = '0' + month;
    }
    return (date.getFullYear() + '-' + month + '-' + date.getDate()).toString();
}
