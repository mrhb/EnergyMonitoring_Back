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
    .getBuildingDataAnalysis(reqLabelAnalysis)
    .then(result => {
        return result;
    }).catch(err => 
        {
            console.log(err)
        });



    try { 
        //"powerReceipt"  3.7
        //"gasReceipt  0.278*37.68,
        //"GASOLIN    0.278*37.3,
        //"BENZIN    0.278*41,
        //"GAS    0.278*37.68
        useFullArea=BuildingData[0].useFullArea;
        climate=BuildingData[0].climateType;
        Eactual=0;
        var temp=BuildingData.reduce((acc,value)=>{
            if(!acc[value.Type])
            {
                acc[value.Type]=0;
            }
            Eactual=Eactual+TablesData.HeatingValue[value.Type]*value.consumptionDurat;
            acc[value.Type]=acc[value.Type]+(TablesData.HeatingValue[value.Type]*value.consumptionDurat);
            return acc
        },{});
        Eactual=Eactual/useFullArea;
     
    }
     catch (e) {
    throw next("در محاسبه برچسب خطایی رخ داده است.")
    console.log(e);
}

Eideal=getIdealE(climate,useFullArea) ;

R=Eactual/Eideal;

Rc=R_C(climate,R,useFullArea);

rank= Ranking(Rc,TablesData.ratioIndex.residential_smal)



var ratio=Rc;
var ConsumptionIndex=Eideal;

// throw next("محاسبه شد")
res.send(Response({"ratio":ratio,"ConsumptionIndex":ConsumptionIndex,"label":TablesData.labels[rank]}));

};


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