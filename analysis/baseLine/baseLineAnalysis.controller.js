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



    try { 
        // useFullArea=BillData[0].useFullArea;
        // climate=BillData[0].climateType;
        // Eactual=0;
        // var temp=BillData.reduce((acc,value)=>{
        //     if(!acc[value.Type])
        //     {
        //         acc[value.Type]=0;
        //     }
        //     Eactual=Eactual+TablesData.HeatingValue[value.Type]*value.consumptionDurat;
        //     acc[value.Type]=acc[value.Type]+(TablesData.HeatingValue[value.Type]*value.consumptionDurat);
        //     return acc
        // },{});
        // Eactual=Eactual/useFullArea;
     
    }
     catch (e) {
    throw next("در محاسبه خط مبنا خطایی رخ داده است.")
    console.log(e);
}



let series=[
    {data:[3,4,1,null,6,3,7,8],name:"power"},
    {data:[5,3,6,7,8,9,null,4],name:"powerBaseLine"}
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