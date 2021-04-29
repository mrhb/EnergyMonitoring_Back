/**
 * @author M.Reza hajjar
 */
const baseLineAnalysisDao = require('./baseLineAnalysis.dao');
const ReqBaseLineAnalysis = require('./reqBaseLineAnalysis.dto');
const Response = require('../../middleware/response/response-handler');
const TablesData = require('./TablesData.json');

const math = require('../../node_modules/mathjs/lib/browser/math')


var moment = require('../../node_modules/jalali-moment/jalali-moment');



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

            for (var i =diffDaysFromInterval; i < diffDaysToInterval+1; i++) {
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


const X =generateXmatrix(paramSeries)
const Y =generateYsmatrix(ysSeries)

coeff= math.multiply(
    math.multiply(
         math.inv( math.multiply(math.transpose(X),X)
         ),
         math.transpose(X))
    , Y);
    YY=math.multiply(X,coeff);
console.log(YY);

    }
     catch (e) {
    throw next("در محاسبه خط مبنا خطایی رخ داده است.")
    console.log(e);
}






res.send(Response({"series":paramSeries,"labels":labels}));

};

function generateXmatrix(paramSeries){
    var rowNum=paramSeries[0].data.length;
    var columnNum=paramSeries.length;
    var X=[];
    for (var i=0;i<rowNum;i++)
    {
        var row=[]
        for (var j=0;j<columnNum;j++)
        {      
            if(paramSeries[j].data[i])     
            row.push(paramSeries[j].data[i]);
            else
            row.push(0);
        }
        X.push(row)
    };
    return X;
}


function generateYsmatrix(paramSeries){
    var rowNum=paramSeries[0].data.length;
    var columnNum=paramSeries.length;
    var X=[];
    for (var i=0;i<rowNum;i++)
    {
        var row=[]
        for (var j=0;j<columnNum;j++)
        {      
            if(paramSeries[j].data[i])     
            row.push(paramSeries[j].data[i]);
            else
            row.push(0);
        }
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
