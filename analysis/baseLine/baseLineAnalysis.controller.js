/**
 * @author M.Reza hajjar
 */
const baseLineAnalysisDao = require('./baseLineAnalysis.dao');
const ReqBaseLineAnalysis = require('./reqBaseLineAnalysis.dto');
const Response = require('../../middleware/response/response-handler');
const TablesData = require('./TablesData.json');


exports.getbaseLine = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
    let reqBaseLineAnalysis = new ReqBaseLineAnalysis(req.body, next);

    
    let BuildingData = await baseLineAnalysisDao
    .getBuildingDataAnalysis(reqBaseLineAnalysis)
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
    throw next("در محاسبه خط مبنا خطایی رخ داده است.")
    console.log(e);
}

Eideal=getIdealE(climate,useFullArea) ;

R=Eactual/Eideal;

Rc=R_C(climate,R,useFullArea);

rank= Ranking(Rc,TablesData.ratioIndex.residential_smal)



var ratio=Rc;
var ConsumptionIndex=Eideal;



let series=[
    {data:[3,4,1,5,6,3,7,8],name:"power"},
    {data:[5,3,6,7,8,9,1,4],name:"powerBaseLine"}
];
let labels=['1/1','2/1','3/1','4/1','5/1','6/1','7/1','8/1'];


res.send(Response({"series":series,"labels":labels}));

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