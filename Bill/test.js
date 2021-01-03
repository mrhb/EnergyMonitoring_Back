var cal_Gom = require('./Tarrif/Gom')

//jomiee,low,middle,higth,var
var kwh=[1,12,16,40,50];
var startDate="1397/06/01";
var endDate="1397/08/01";
var demandM=320;//دیماند مصرفی
var demandG=1400; //دیماند قراردادی
console.log(cal_Gom(kwh,demandM,demandG,startDate,endDate));
