/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqBaseLineAnalysis;
var moment = require('../../node_modules/jalali-moment/jalali-moment');




function ReqBaseLineAnalysis(data,next) {
    validate(data,next);
    
    this.buildingId = data.buildingId;

    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);

    // this.toDate.setDate( this.toDate.getDate() - 1 );

}

function validate(data, next) {
    if (!data.buildingId) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
 
}
