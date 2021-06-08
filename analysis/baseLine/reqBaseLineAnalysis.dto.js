/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqBaseLineAnalysis;
var moment = require('../../node_modules/jalali-moment/jalali-moment');




function ReqBaseLineAnalysis(data,next) {
    validate(data,next);
    
    this.buildingId = data.buildingId;

    this.after=[];
    this.befor=[];
    this.after.fromDate = new Date(data.fromDate);
    this.after.toDate = new Date(data.toDate);


    m = moment(this.after.fromDate , 'YYYY/M/D');
    m.add(-36, 'month').locale('fa').format('YYYY/MM/DD');
    this.befor.fromDate =new Date(m.locale('en').format('YYYY/MM/DD'));
    this.befor.toDate = new Date(data.fromDate);


 

    this.coolingBase=data.coolingBase; //دمای پایه سرمایش
    this.heatingBase=data.heatingBase; //دمای پایه گرمایش

    this.energyType=data.energyType; // نوع حامل
    // this.toDate.setDate( this.toDate.getDate() - 1 );

}


function validate(data, next) {
    if (!data.buildingId) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
 
}
