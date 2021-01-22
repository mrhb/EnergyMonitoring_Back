/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqWallInformation;

function ReqWallInformation(data, next) {
    validate(data, next);
    this.reqWallInformation = {
        exWallAdjOutSpaceArea: data.exWallAdjOutSpaceArea,
        exFloorAdjOutSpaceArea: data.exFloorAdjOutSpaceArea,
        exWallAdjNotControlledSpaceArea: data.exWallAdjNotControlledSpaceArea,
        exFloorAdjNotControlledSpaceArea: data.exFloorAdjNotControlledSpaceArea,
        exRoofAdjOutSpaceArea: data.exRoofAdjOutSpaceArea,
        outWindowAdjOutSpaceArea: data.outWindowAdjOutSpaceArea,
        exRoofAdjNotControlledSpaceArea: data.exRoofAdjNotControlledSpaceArea,
        windowAdjNotControlledSpaceArea: data.windowAdjNotControlledSpaceArea
    }
}

function validate(data, next) {
    console.log(data.exWallAdjOutSpaceArea)
    if (data.exWallAdjOutSpaceArea === null) {
        throw next("مساحت دیوار خارجی مجاور فضای خارج نمیتواند خالی باشد.");
    }
    if (data.exFloorAdjOutSpaceArea === null) {
        throw next("مساحت کف خارجی مجاور فضای خارج نمیتواند خالی باشد.");
    }
    if (data.exWallAdjNotControlledSpaceArea === null) {
        throw next("مساحت دیوار خارجی مجاور فضای کنترل نشده نمیتواند خالی باشد.");
    }
    if (data.exFloorAdjNotControlledSpaceArea === null) {
        throw next("مساحت کف خارجی مجاور فضای کنترل نشده نمیتواند خالی باشد.");
    }
    if (data.exRoofAdjOutSpaceArea === null) {
        throw next("مساحت سقف/بام خارجی مجاور فضای خارج نمیتواند خالی باشد.");
    }
    if (data.outWindowAdjOutSpaceArea === null) {
        throw next("مساحت پنجره مجاور فضای خارج نمیتواند خالی باشد.");
    }
    if (data.exRoofAdjNotControlledSpaceArea === null) {
        throw next("مساحت سقف/بام خارجی مجاور فضای کنترل نشده نمیتواند خالی باشد.");
    }
    if (data.windowAdjNotControlledSpaceArea === null) {
        throw next("مساحت پنجره مجاور فضای کنترل نشده نمیتواند خالی باشد.");
    }
}
