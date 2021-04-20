/**
 * @author M.Reza hajjar
 */
const labelAnalysisDao = require('./labelAnalysis.dao');
const ReqLabelAnalysis = require('./reqLabelAnalysis.dto');

const Response = require('../../middleware/response/response-handler');


exports.getlabel = async (req, res, next) => {
//    console.log('user.id ' + req.user.id);

    let reqLabelAnalysis = new ReqLabelAnalysis(req.body, next);

    
    let BuildingData = await labelAnalysisDao
    .getBuildingDataAnalysis(reqLabelAnalysis)
    .then(result => {
        return result;
    }).catch(err => console.log(err));

    var sfgsr=BuildingData.reduce((acc,value)=>{
        if(!acc[value.Type])
        {
            acc[value.Type]=0;
        }
        acc[value.Type]=acc[value.Type]+value.consumptionDurat
         return acc
    },{});

    var ratio=11.98;
    var ConsumptionIndex=1377;

    res.send(Response({"ratio":ratio,"ConsumptionIndex":ConsumptionIndex}));
};