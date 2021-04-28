/**
 * @author M.Reza hajjar
 */
const baseLineAnalysisDao = require('./baseLineAnalysis.dao');
const ReqBaseLineAnalysis = require('./reqBaseLineAnalysis.dto');
const Response = require('../../middleware/response/response-handler');
const TablesData = require('./TablesData.json');

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
        let series=[]

    try { 

        var temp=ClimateData.reduce((acc,value)=>{
            var diff = Math.abs(value.forDate.getTime() - reqBaseLineAnalysis.fromDate.getTime());
            var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
            hdd[diffDays]=value.tempAvg 
            cdd[diffDays]=value.tempAvg 
            return acc
        },{});

        var types=[]
        var temp2=BillData.reduce((acc,value)=>{
            if(!acc[value.Type])
            {
                acc[value.Type]= {data:clone(initData),name:value.Type};
                types.push(value.Type);
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
      
        types.forEach(element => {
            series.push(temp2[element]);
        });
    }
     catch (e) {
    throw next("در محاسبه خط مبنا خطایی رخ داده است.")
    console.log(e);
}



series.push({data:hdd,name:"hdd"});
series.push({data:cdd,name:"cdd"});
// let labels=['1/1','2/1','3/1','4/1','5/1','6/1','7/1','8/1'];


res.send(Response({"series":series,"labels":labels}));

};


function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
