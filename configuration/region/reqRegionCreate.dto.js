/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqRegionCreate;

const mongoose = require('../../config/mongoose').mongoose;

function ReqRegionCreate(data, userId, region, next) {
    validate(data, next);
    this.parentId = data.parentId;
    this.title = data.title;
}

function validate(data,  next) {
    if (!data.parentId) {
        throw next("شناسه منطقه بالاتر نمیتواند خالی باشد.");
    }
    if (!data.title) {
        throw next("نام منطقه نمیتواند خالی باشد.");
    }
}
