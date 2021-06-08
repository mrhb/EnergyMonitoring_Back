/**
 * @author M.Reza hajjar
 */
const baseLineAnalysisDao = require('./baseLineAnalysis.dao');
const ReqBaseLineAnalysis = require('./reqBaseLineAnalysis.dto');
const Response = require('../../middleware/response/response-handler');
const TablesData = require('./TablesData.json');

const math = require('../../node_modules/mathjs/lib/browser/math')


var moment = require('../../node_modules/jalali-moment/jalali-moment');

exports.getbaseLineSingleCarier = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
    let reqBaseLine = new ReqBaseLineAnalysis(req.body, next);

    let BillData_Befor = await baseLineAnalysisDao
    .getBillData('gasReceipt',reqBaseLine.befor.fromDate,reqBaseLine.befor.toDate,reqBaseLine.buildingId)
    .then(result => {return result;})
    .catch(err => {console.log(err)});
    await Promise.all(BillData_Befor.map(async (bill) => {
        var  weather = await baseLineAnalysisDao.getClimateData(bill.fromDate,bill.toDate,reqBaseLine.buildingId)
        .then(result => {return result;})
        .catch(err => {console.log(err)});
        bill.hdd=weather.reduce((a, b) =>{
            if(b.tempAvg<=reqBaseLine.heatingBase)
            b.tempAvg=0;
            return a + b.tempAvg;}, 0);
        bill.cdd=weather.reduce((a, b) =>{
            if(b.tempAvg>=reqBaseLine.coolingBase)
            b.tempAvg=0;
            return a + b.tempAvg;}, 0);
        }));


    let BillData_After = await baseLineAnalysisDao
    .getBillData('gasReceipt',reqBaseLine.after.fromDate,reqBaseLine.after.toDate,reqBaseLine.buildingId)
    .then(result => {return result;})
    .catch(err => {console.log(err)});
    await Promise.all(BillData_After.map(async (bill) => {
        var  weather = await baseLineAnalysisDao.getClimateData(bill.fromDate,bill.toDate,reqBaseLine.buildingId)
        .then(result => {return result;})
        .catch(err => {console.log(err)});

        bill.hdd=weather.reduce((a, b) =>{
            if(b.tempAvg<=reqBaseLine.heatingBase)
            b.tempAvg=0;
            return a + b.tempAvg;}, 0);
        bill.cdd=weather.reduce((a, b) =>{
            if(b.tempAvg>=reqBaseLine.coolingBase)
            b.tempAvg=0;
            return a + b.tempAvg;}, 0);
        }));

    var labels=[];


    try { 


        var Befor=BillData_Befor.reduce((acc,value)=>{
            m = moment.from(value.fromDate, 'en', 'MM/YYYY/DD').locale('fa');
            labels.push(m.format('YYYY/MM/DD'));

            acc['Ys'].push(value.consumptionAmount);
            acc['HDD'].push(value.hdd);
            acc['CDD'].push(value.cdd);
            var diff = Math.abs(value.toDate.getTime() - value.fromDate.getTime());
             var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            acc['NDays'].push(diffDays);
            return acc
        },{'Ys':[],'HDD':[],'CDD':[],'NDays':[]});

        var After=BillData_After.reduce((acc,value)=>{
            m = moment.from(value.fromDate, 'en', 'MM/YYYY/DD').locale('fa');
            labels.push(m.add(1, 'day').format('YYYY/MM/DD'));

            acc['Ys'].push(value.consumptionAmount);
            acc['HDD'].push(value.hdd);
            acc['CDD'].push(value.cdd);
            var diff = Math.abs(value.toDate.getTime() - value.fromDate.getTime());
             var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            acc['NDays'].push(diffDays);
            return acc
        },{'Ys':[],'HDD':[],'CDD':[],'NDays':[]});
      

// const X = math.matrix([[5, 6,1], [1, 1,1], [7, 8,1], [2, 3,1]]);
// console.log(X);
// const Y = math.matrix([[5],[6],[1], [1]]);
// console.log(Y);


const X =generateXmatrix(Befor);
const Y =generateYsmatrix(Befor);

const X_After =generateXmatrix(After);
// const Y_After =generateYsmatrix(After);

var YY=[];
Xt=math.transpose(X);
XtX= math.multiply(Xt,X);
inv_Xtx= math.inv(XtX);

coeff= math.multiply(
    math.multiply(
        inv_Xtx,Xt)
    , Y);
YY=math.multiply(X,coeff);

  
consumption= { data: [], name: 'مصرف' };
Befor['Ys'].forEach(y=>{consumption['data'].push(y)});
After['Ys'].forEach(y=>{consumption['data'].push(y)});


regression= { data: new Array(Befor['Ys'].length+After['Ys'].length), name: 'رگرسیون' };

YY_Befor=math.multiply(X,coeff);
Befor['Ys'].forEach((y,index_Befor)=>{regression['data'][index_Befor]=YY_Befor[index_Befor][0]});
After['Ys'].forEach((y,index)=>{regression['data'][Befor['Ys'].length+index]=null});



baseLine= { data: new Array(Befor['Ys'].length+After['Ys'].length), name: 'خط مبنا' };

YY_After=math.multiply(X_After,coeff);
Befor['Ys'].forEach((y,index_Befor)=>{baseLine['data'][index_Befor]=null});
After['Ys'].forEach((y,index)=>{baseLine['data'][Befor['Ys'].length+index]=YY_After[index][0]});


}
catch (e) {
throw next("در محاسبه خط مبنا خطایی رخ داده است.")
console.log(e);
}

series=[];
series.push(consumption);
series.push(regression);
series.push(baseLine);


res.send(Response({"series":series,"labels":labels}));

};



exports.getbaseLine = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
    let reqBaseLineAnalysis = new ReqBaseLineAnalysis(req.body, next);

    var diff = Math.abs(reqBaseLineAnalysis.toDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    var interval=diffDays;


    let BillData = await baseLineAnalysisDao
    .getBillData(reqBaseLineAnalysis)
    .then(result => {
        return result;
    }).catch(err => 
        {
            console.log(err)
        });


  let ClimateData = await baseLineAnalysisDao
    .getClimateData(reqBaseLineAnalysis)
    .then(result => {
        return result;
    }).catch(err => 
        {
            console.log(err)
        });

    var labels=[];
        m = moment.from(reqBaseLineAnalysis.fromDate, 'en', 'MM/YYYY/DD').locale('fa');
        for(var d=0;d<interval;d++) labels.push(m.add(1, 'day').format('YYYY/MM/DD'));
        var initData=[];
        var size=interval;
        while(size--){
            initData[size] = null; 
        }
        var hdd=clone(initData);
        var cdd=clone(initData);

        let ysSeries=[]
        let paramSeries=[]

    try { 

        var temp=ClimateData.reduce((acc,value)=>{
            var diff = Math.abs(value.forDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            hdd[diffDays]=value.tempAvg 
            cdd[diffDays]=value.tempAvg 
            return acc
        },{});

        var params=[]
        var paramNames=['HDD','CDD']
        params['HDD']= {data:hdd,name:'HDD'};
        params['CDD']= {data:cdd,name:'CDD'};

        var YsNames=[]
        var Ys=BillData.reduce((acc,value)=>{
            if(!acc[value.Type])
            {
                acc[value.Type]= {data:clone(initData),name:value.Type};
                YsNames.push(value.Type);
            }
            var diff = Math.abs(value.fromDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
            var diffDaysFromInterval = Math.ceil(diff / (1000 * 3600 * 24)); 

            var diff = Math.abs(value.toDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
            var diffDaysToInterval = Math.ceil(diff / (1000 * 3600 * 24)); 

            for (var i =diffDaysFromInterval; i < diffDaysToInterval; i++) {
                if(acc[value.Type].data[i])
                acc[value.Type].data[i]=acc[value.Type].data[i]+value.consumptionDurat/(diffDaysToInterval-diffDaysFromInterval);
                else
                acc[value.Type].data[i]=value.consumptionDurat/(diffDaysToInterval-diffDaysFromInterval);
            }
            return acc
        },{});
      
        YsNames.forEach(element => {
            ysSeries.push(Ys[element]);
        });
        paramNames.forEach(element => {
            paramSeries.push(params[element]);
        });

// const X = math.matrix([[5, 6,1], [1, 1,1], [7, 8,1], [2, 3,1]]);
// console.log(X);
// const Y = math.matrix([[5],[6],[1], [1]]);
// console.log(Y);

paramSeries.shift()

const X =generateXmatrix(paramSeries);
const Y =generateYsmatrix(ysSeries)

var YY=[];
Xt=math.transpose(X);
XtX= math.multiply(Xt,X);
inv_Xtx= math.inv(XtX);

coeff= math.multiply(
    math.multiply(
        inv_Xtx,Xt)
    , Y);
    YY=math.multiply(X,coeff);
console.log(YY);

baseLineSeries=[];
YsNames.forEach((element,index) => {
column=math.column(YY, index);

culomnArray=column.reduce((acc,elm)=>{
    acc.push(elm.shift());
    return acc;
}
    )
    baseLineSeries.push({data:culomnArray,name:element+'_baseLine'});
});

    }
     catch (e) {
    throw next("در محاسبه خط مبنا خطایی رخ داده است.")
    console.log(e);
}



series=[];
baseLineSeries.forEach(element => {
    series.push(element);
});
ysSeries.forEach(element => {
    series.push(element);
});
paramSeries.forEach(element => {
    series.push(element);
});


res.send(Response({"series":series,"labels":labels}));

};

function generateXmatrix(paramSeries){
    var rowNum=paramSeries['HDD'].length;
    var X=[];
    for (var i=0;i<rowNum;i++)
    {
        var row=[]
        row.push(paramSeries['HDD'][i]);
        row.push(paramSeries['CDD'][i]);
        row.push(paramSeries['NDays'][i]);
        X.push(row)
    };
    return X;
}
function generateYsmatrix(paramSeries){
        var rowNum=paramSeries['Ys'].length;
        var columnNum=3;
        var X=[];
        for (var i=0;i<rowNum;i++)
        {
            var row=[]
            row.push(paramSeries['Ys'][i]);
            X.push(row)
        };
        return X;
}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
