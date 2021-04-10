/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqRegionEdit;

const mongoose = require('../../config/mongoose').mongoose;

function ReqRegionEdit(data, userId, region, next) {
    validate(data, next);
    this.id=data.id
    this.parentId = data.parentId;
    this.title = data.title;
}

function validate(data,  next) {
    if (!data.id) {
        throw next("شناسه منطقه نمیتواند خالی باشد.");
    }
    if (!data.parentId) {
        throw next("شناسه منطقه بالاتر نمیتواند خالی باشد.");
    }
    if (!data.title) {
        throw next("نام منطقه نمیتواند خالی باشد.");
    }
}
