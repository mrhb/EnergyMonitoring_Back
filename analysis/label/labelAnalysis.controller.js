/**
 * @author M.Reza hajjar
 */
const labelAnalysisDao = require('./labelAnalysis.dao');
const ReqLabelAnalysis = require('./reqLabelAnalysis.dto');
const Response = require('../../middleware/response/response-handler');
const TablesData = require('./TablesData.json');


exports.getlabel = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
    let reqLabelAnalysis = new ReqLabelAnalysis(req.body, next);

    
    let BuildingData = await labelAnalysisDao
    .getBuildingData(reqLabelAnalysis)
    .then(result => {
        return result;
    }).catch(err => 
        {
            console.log(err)
        });
    useFullArea=BuildingData[0].useFullArea;
    climate=BuildingData[0].climateType;


    let BillData = await labelAnalysisDao
    .getBillData(reqLabelAnalysis)
    .then(result => {
        return result;
    }).catch(err => 
        {
            console.log(err)
        });

        
        //"powerReceipt"  3.7
        //"gasReceipt  0.278*37.68,
        //"GASOLIN    0.278*37.3,
        //"BENZIN    0.278*41,
        //"GAS    0.278*37.68
        Eactual=0;
     

        BillData.forEach(element => {
            element.toDate=new Date(element.toDate);
            element.fromDate=new Date(element.fromDate);
        
            var diff = Math.abs(element.toDate.getTime() - element.fromDate.getTime());
            element.diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
        });

        var YsNames=[]
        var initData=[];
        reqLabelAnalysis.monthInfo.forEach(m=>{initData.push(null);})

        
        var Ys=BillData.reduce((acc,value)=>{
            if(!acc[value.Type])
            {
                acc[value.Type]= {data:clone(initData),name:value.Type};
                YsNames.push(value.Type);
            }
        
            reqLabelAnalysis.monthInfo.forEach((item, i)=>{
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
            return acc
        },{});

       var labelDetail= {
            "powerReceipt":0,
            "gasReceipt" :  0,
            "GASOLIN" :     0,
            "BENZIN" :      0,
            "GAS" :         0 
          }
YsNames.forEach(name=>{
    labelDetail[name]=Ys[name].data.reduce((a, b) => a + b, 0)*TablesData.HeatingValue[name];
})

    Eactual=[labelDetail['powerReceipt'],
                labelDetail['gasReceipt'],
                labelDetail['GASOLIN'],
                labelDetail['BENZIN'],
                labelDetail['GAS'],
            ].reduce((a, b) => a + b, 0);


Eideal=getIdealE(climate,useFullArea) ;
R=Eactual/Eideal;
Rc=R_C(climate,R,useFullArea);
rank= Ranking(Rc,TablesData.ratioIndex.residential_smal)
var ratio=Rc;
var consumptionIndex=Eideal;



labelDetail['ratio']=ratio;
labelDetail['consumptionIndex']=consumptionIndex;
labelDetail['label']=TablesData.labels[rank];
labelDetail['labelType']=TablesData.labels[rank];


res.send(Response(labelDetail));

};

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


function getIdealE(climate,useFullArea) {
    if(useFullArea>1000)
    return TablesData.Index[climate].larg;
    else  
    return TablesData.Index[climate].small;

}


function R_C(climate,ratio,_useFullArea) {
    var C=1;
    if((climate=="TEMPER_RAINY"|| 
        climate=="SEMI_TEMPER_RAINY") && _useFullArea>1000)
    C=1.7*ratio-0.7;
    
    return C*ratio;//C*R

}

function Ranking(x,xs) {


    ys=[0,1,2,3,4,5,6,7]
    // bisect
    var lo = 0, hi = xs.length - 1;
    while (hi - lo > 1) {
      var mid = (lo + hi) >> 1;
      if (x < xs[mid]) hi = mid;
      else lo = mid;
    }
    // project
    temp=ys[lo] + (ys[hi] - ys[lo]) / (xs[hi] - xs[lo]) * (x - xs[lo]);

    if(temp>=8)temp=7;
    return Math.round(temp);
  };