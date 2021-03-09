/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateEnergySharing;

function ReqCreateEnergySharing(data, userId, next) {
    validate(data, next);

    this.name = data.name;
    this.address = data.address;
    this.energyCarrier = data.energyCarrier;
    if (this.energyUnit !== null && this.energyUnit !== 'undefined') {
        this.energyUnit = data.energyUnit;
    }
    if (this.shareNumber !== null && this.shareNumber !== 'undefined') {
        this.shareNumber = data.shareNumber;
    }
    this.capacity=data.capacity;
    this.kiloWatConvert=data.kiloWatConvert;
    this.buildingNum = 0;
    this.creatorId = userId;
    this.ownerId = userId;
}

function validate(data, next) {
    if (!data.name) {
        throw next("نام مشترک نمیتواند خالی باشد.");
    }
    if (!data.address) {
        throw next("نشانی محل مصرف نمیتواند خالی باشد.");
    }
    if (!data.energyCarrier) {
        throw next("حامل انرژی نمیتواند خالی باشد.");
    }
}
