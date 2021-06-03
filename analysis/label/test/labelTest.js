const BillData = require('./sampleData.json');
const Req = require('./req');
// const math = require('../../node_modules/mathjs/lib/browser/math')
const math = require('./../../../node_modules/mathjs/lib/browser/math')
// var moment = require('../../node_modules/jalali-moment/jalali-moment');
var moment = require('./../../../node_modules/jalali-moment/jalali-moment');
const { months, max } = require('./../../../node_modules/jalali-moment/jalali-moment');


let reqBaseLineAnalysis=new Req(1397);
var diff = Math.abs(reqBaseLineAnalysis.toDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
var interval=reqBaseLineAnalysis.monthInfo.length;

var labels=[];
var initData=[];
reqBaseLineAnalysis.monthInfo.forEach(m=>{
    labels.push(m.month)
    initData.push(null);
})


BillData.forEach(element => {
    element.toDate=new Date(element.toDate);
    element.fromDate=new Date(element.fromDate);

    var diff = Math.abs(element.toDate.getTime() - element.fromDate.getTime());
    element.diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
});

let ysSeries=[]
let paramSeries=[]

// try { 


var params=[]
var YsNames=[]
var Ys=BillData.reduce((acc,value)=>{
    if(!acc[value.Type])
    {
        acc[value.Type]= {data:clone(initData),name:value.Type};
        YsNames.push(value.Type);
    }

    reqBaseLineAnalysis.monthInfo.forEach((item, i)=>{
        max_from= new Date(Math.max(value.fromDate,item.fromDate));
        min_to  = new Date(Math.min(value.toDate  ,item.toDate  ));

        var diff = max_from.getTime() - min_to.getTime();

        var commonDays = Math.ceil(diff / (1000 * 3600 * 24)); 


        if(acc[value.Type].data[i])
        acc[value.Type].data[i]=acc[value.Type].data[i]+commonDays*value.consumptionDurat/value.diffDays;
        else
        acc[value.Type].data[i]=commonDays*value.consumptionDurat/value.diffDays;

        value.forEachconsumptionDurat*commonDays/value.diffDays
    })

    


    // var diff = Math.abs(value.fromDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
    // var diffDaysFromInterval = Math.ceil(diff / (1000 * 3600 * 24)); 

    // var diff = Math.abs(value.toDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
    // var diffDaysToInterval = Math.ceil(diff / (1000 * 3600 * 24)); 

    // for (var i =diffDaysFromInterval; i < diffDaysToInterval; i++) {
    //     if(acc[value.Type].data[i])
    //     acc[value.Type].data[i]=acc[value.Type].data[i]+value.consumptionDurat/(diffDaysToInterval-diffDaysFromInterval);
    //     else
    //     acc[value.Type].data[i]=value.consumptionDurat/(diffDaysToInterval-diffDaysFromInterval);
    // }
    return acc
},{});
console.log(Ys)
// YsNames.forEach(element => {
//     ysSeries.push(Ys[element]);
// });
// paramNames.forEach(element => {
//     paramSeries.push(params[element]);
// });

// // const X = math.matrix([[5, 6,1], [1, 1,1], [7, 8,1], [2, 3,1]]);
// // console.log(X);
// // const Y = math.matrix([[5],[6],[1], [1]]);
// // console.log(Y);

// // paramSeries.shift();


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
