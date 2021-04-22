/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqLabelAnalysis;
var moment = require('../../node_modules/jalali-moment/jalali-moment');




function ReqLabelAnalysis(data,next) {
    validate(data,next);
    
    this.buildingId = data.buildingId;
    endDate= moment.from(
        (data.year+1).toString()+'/01/01', 'fa', 'YYYY/MM/DD');

    
    startDate= moment.from(
        (data.year-3).toString()+'/01/01', 'fa', 'YYYY/MM/DD');

    this.fromDate = new Date(startDate._i.substring(0,10));
    this.toDate = new Date(endDate._i.substring(0,10));

    this.toDate.setDate( this.toDate.getDate() - 1 );

}

function validate(data, next) {
    if (!data.buildingId) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    if (!data.year) {
        throw next("سال انتخاب نشده است.");
    }
}
