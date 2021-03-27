/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqBuildingSpace;

const mongoose = require('../../../config/mongoose').mongoose;

function ReqBuildingSpace(data, isCreate, next) {
    validate(data, isCreate, next);
    if (isCreate) {
        this._id = new mongoose.Types.ObjectId();
    } else {
        this._id = data.id;
    }
    this.name = data.name;
    this.number = data.number;
    this.floorNum = data.floorNum;
    this.useType = data.useType;
    this.area = data.area;
    this.waterSharingNum = data.waterSharingNum;
    this.gasSharingNum = data.gasSharingNum;
    this.powerSharingNum = data.powerSharingNum;
    this.nonEnergyCarrierSharingNum = data.nonEnergyCarrierSharingNum;
}

function validate(data, isCreate, next) {
    if (isCreate === false){
        if (!data.id) {
            throw next("شناسه فضا نمیتواند خالی باشد.");
        }
    }
    if (!data.name) {
        throw next("نام فضا نمیتواند خالی باشد.");
    }
    if (!data.number) {
        throw next("شماره فضا نمیتواند خالی باشد.");
    }
    if (!data.floorNum) {
        throw next("شماره طبقه نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("کاربری نمیتواند خالی باشد.");
    }
    if (!data.area) {
        throw next("مساحت نمیتواند خالی باشد.");
    }
}
