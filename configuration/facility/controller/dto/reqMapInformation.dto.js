/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqMapInformation;

const mongoose = require('./../../../../config/mongoose').mongoose;//

function ReqMapInformation(data, isCreate, next) {
    validate(data, isCreate, next);
    if (isCreate) {
        this._id = new mongoose.Types.ObjectId();
    } else {
        this._id = data.id;
    }
    this.title = data.title;
    this.category = data.category;
    this.number = data.number;
    this.fileLink = data.fileLink;
}

function validate(data, isCreate, next) {
    if (isCreate === false){
        if (!data.id) {
            throw next("شناسه نقشه نمیتواند خالی باشد.");
        }
    }
    if (!data.title) {
        throw next("عنوان نقشه نمیتواند خالی باشد.");
    }
    if (!data.category) {
        throw next("دسته بندی نقشه نمیتواند خالی باشد.");
    }
    if (!data.number) {
        throw next("شماره نقشه نمیتواند خالی باشد.");
    }
    if (!data.fileLink) {
        throw next("آدرس فایل نمیتواند خالی باشد.");
    }
}
