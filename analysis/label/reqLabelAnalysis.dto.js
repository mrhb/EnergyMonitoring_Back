/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqLabelAnalysis;

function ReqLabelAnalysis(data,next) {
    validate(data,next);

    this.buildingId = data.buildingId;
    this.fromDate = new Date("2020-03-20");
    this.toDate = new Date("2021-09-27");

    this.year = data.year;
}

function validate(data, next) {
    if (!data.buildingId) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    if (!data.year) {
        throw next("سال انتخاب نشده است.");
    }
}
