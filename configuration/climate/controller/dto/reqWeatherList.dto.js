/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqWeatherList;

function ReqWeatherList(data,next) {
    validate(data,next);
    this.regionId = data.regionId;
    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);
}

function validate(data, next) {
    if (!data.regionId) {
        throw next("شناسه منطقه نمی تواند خالی باشد.");
    }
    if (!data.toDate) {
        throw next("تا تاریخ نمی تواند خالی باشد.");
    }
    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
        throw next("تاریخ شروع نمی تواند بعد از تاریخ پایان باشد.");
    }

}
