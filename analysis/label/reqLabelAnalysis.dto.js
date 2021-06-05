/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqLabelAnalysis;
var moment = require('../../node_modules/jalali-moment/jalali-moment');




function ReqLabelAnalysis(data,next) {
    validate(data,next);
    
    this.energyLabelType = data.energyLabelType;

    this.buildingId = data.buildingId;
    endDate= moment.from(
        (data.year+1).toString()+'/01/01', 'fa', 'YYYY/MM/DD');

    
    startDate= moment.from(
        (data.year-3).toString()+'/01/01', 'fa', 'YYYY/MM/DD');

    this.fromDate = new Date(startDate._i.substring(0,10));
    this.toDate = new Date(endDate._i.substring(0,10));

    this.toDate.setDate( this.toDate.getDate() - 1 );
    this.monthInfo=yearToMonth(data.year-2).concat(yearToMonth(data.year-1)).concat(yearToMonth(data.year));

}

function validate(data, next) {
    if (!data.buildingId) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    if (!data.year) {
        throw next("سال انتخاب نشده است.");
    }


    if (data.energyLabelType !== 'RESIDENTIALLARG' && data.energyLabelType !== 'RESIDENTIALSMAL' && data.energyLabelType !== 'OFFICIAL' && data.energyLabelType !== 'NONOFFICIAL' ) {
    throw next("نوع کاربری درست انتخاب نشده است.");
}

}


function yearToMonth(year) {
    MonthInfo=[];
for(var month=1;month<12;month++)
{
    month_str=("0" + (month+1)).slice(-2);
    endDate= moment.from((year).toString()+'/'+month_str+'/01', 'fa', 'YYYY/MM/DD');
    
    startDate=  moment.from((year).toString()+'/'+("0" + month).slice(-2)+'/01', 'fa', 'YYYY/MM/DD');

    
    month_fromDate = new Date(startDate._i.substring(0,10));
    month_toDate = new Date(endDate._i.substring(0,10));
    month_toDate.setDate( month_toDate.getDate() - 1 );
    MonthInfo.push({month:(year).toString()+'/'+("0" + month).slice(-2),fromDate:month_fromDate,toDate:month_toDate})
}

    month_str=("0" + (month)).slice(-2);
    startDate= moment.from((year).toString()+'/'+month_str+'/01', 'fa', 'YYYY/MM/DD');

    endDate=  moment.from((year+1).toString()+'/01/01', 'fa', 'YYYY/MM/DD');
    
    month_fromDate = new Date(startDate._i.substring(0,10));
    month_toDate = new Date(endDate._i.substring(0,10));
    month_toDate.setDate( month_toDate.getDate() - 1 );
    MonthInfo.push({month:(year).toString()+'/'+month_str,fromDate:month_fromDate,toDate:month_toDate})

    return MonthInfo;
}