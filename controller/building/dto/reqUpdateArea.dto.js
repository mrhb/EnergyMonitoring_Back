/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqUpdateArea;

function ReqUpdateArea(data, next) {
    validate(data, next);
    this.arenaArea = data.arenaArea;
    this.ayanArea = data.ayanArea;
    this.useFullArea = data.useFullArea;
    this.externalWallsTotalArea = data.externalWallsTotalArea;
    this.externalGlassTotalArea = data.externalGlassTotalArea;
}

function validate(data, next) {
    if (!data.arenaArea) {
        throw next("مساحت عرصه نمیتواند خالی باشد.");
    }
    if (!data.ayanArea) {
        throw next("مساحت اعیان نمیتواند خالی باشد.");
    }
    if (!data.useFullArea) {
        throw next("مساحت مفید نمیتواند خالی باشد.");
    }
    // if (!data.externalWallsTotalArea) {
    //     throw next("مساحت کل جداره های خارجی نمیتواند خالی باشد.");
    // }
    // if (!data.externalGlassTotalArea) {
    //     throw next("مساحت کل شیشه خارجی نمیتواند خالی باشد.");
    // }
}
