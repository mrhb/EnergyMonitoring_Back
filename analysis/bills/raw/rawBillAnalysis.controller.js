/**
 * @author M.Reza hajjar
 */
const rawBillAnalysisDao = require('./rawBillAnalysis.dao');
const ReqRawBillAnalysis = require('./reqRawBillAnalysis.dto');

const Response = require('../../../middleware/response/response-handler');
var moment = require('../../../node_modules/jalali-moment/jalali-moment');


exports.cost = async (req, res, next) => {
//    console.log('user.id ' + req.user.id);
    if (req.body.regionId){
        this.regionId = req.body.regionId;
    }else {
        this.regionId = "";
    }

    let reqRawBillAnalysis = new ReqRawBillAnalysis(req.body, next);
    
    var diff = Math.abs(reqRawBillAnalysis.toDate.getTime() - reqRawBillAnalysis.fromDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    var interval=diffDays;

    
    let CapacityListByRegion = await rawBillAnalysisDao
    .getRawBillAnalysis(reqRawBillAnalysis)
    .then(result => {
        return result;
    }).catch(err => console.log(err));


    var labels=[];
    m = moment.from(reqRawBillAnalysis.fromDate, 'en', 'MM/YYYY/DD').locale('fa');
    for(var d=0;d<interval;d++) labels.push(m.add(1, 'day').format('YYYY/MM/DD'));
    var initData=[];
    var size=interval;
    while(size--){
        initData[size] = null; 
    }
    

    let ysSeries=[]
    var YsNames=[]
    var Ys=CapacityListByRegion.reduce((acc,value)=>{
        if(!acc[value.buildingName])
        {
            acc[value.buildingName]= {data:clone(initData),name:value.buildingName};
            YsNames.push(value.buildingName);
        }
        var diff = Math.abs(value.fromDate.getTime() - reqRawBillAnalysis.fromDate.getTime());
        var diffDaysFromInterval = Math.ceil(diff / (1000 * 3600 * 24)); 

        var diff = Math.abs(value.toDate.getTime() - reqRawBillAnalysis.fromDate.getTime());
        var diffDaysToInterval = Math.ceil(diff / (1000 * 3600 * 24)); 

        for (var i =diffDaysFromInterval; i < diffDaysToInterval; i++) {
            if(acc[value.buildingName].data[i])
            acc[value.buildingName].data[i]=acc[value.buildingName].data[i]+value.consumptionDurat/(diffDaysToInterval-diffDaysFromInterval);
            else
            acc[value.buildingName].data[i]=value.consumptionDurat/(diffDaysToInterval-diffDaysFromInterval);
        }
        return acc
    },{});
  
    YsNames.forEach(element => {
        ysSeries.push(Ys[element]);
    });
    
    res.send(Response({"series":ysSeries,"labels":labels}));
};
exports.consumption = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await rawBillAnalysisDao
        .getCapacityListByRegion(this.regionId)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    
        let labels=[];
        let capacity=CapacityListByRegion.reduce((acc,value)=>{
            if(!acc[value.capacity])
            {
                acc[value.capacity]={data:[],name:value.capacity};
            }
    
            if(!labels[value.title])
            {
                labels.push(value.title);
            }
            acc[value.capacity].data.push(value.Count);
             return acc
        },{});
    
    
        CapacityList=[];
    
        for (const [key, value] of Object.entries(capacity)) {
            CapacityList.push(value)
          }
    
    
          function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
          }
          
          // usage example:
          labels = labels.filter(onlyUnique);
        res.send(Response({"series":CapacityList,"labels":labels}));
    };

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    