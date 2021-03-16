/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = ReqBuildingAllocation;

const mongoose = require('../../../../config/mongoose').mongoose;

function ReqBuildingAllocation(data, isCreate, next) {
    validate(data, isCreate, next);
    if (isCreate) {
        this._id = new mongoose.Types.ObjectId();
    } else {
        this._id = data.id;
    }
    this.buildingId = data.buildingId;
    this.allocationPercentage = data.allocationPercentage;
}

function validate(data, isCreate, next) {
    if (isCreate === false){
        if (!data.id) {
            throw next("شناسه نمیتواند خالی باشد.");
        }
    }
    if (!data.buildingId) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    if (!data.allocationPercentage) {
        throw next("درصد تخصیص نمیتواند خالی باشد.");
    }
}
