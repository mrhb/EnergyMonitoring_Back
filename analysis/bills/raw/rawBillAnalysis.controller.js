/**
 * @author M.Reza hajjar
 */
const rawBillAnalysisDao = require('./rawBillAnalysis.dao');
const ReqRawBillAnalysis = require('./reqRawBillAnalysis.dto');

const Response = require('../../../middleware/response/response-handler');


exports.cost = async (req, res, next) => {
//    console.log('user.id ' + req.user.id);
    if (req.body.regionId){
        this.regionId = req.body.regionId;
    }else {
        this.regionId = "";
    }

    let reqRawBillAnalysis = new ReqRawBillAnalysis(req.body, next);

    
    let CapacityListByRegion = await rawBillAnalysisDao
    .getRawBillAnalysis(reqRawBillAnalysis)
    .then(result => {
        return result;
    }).catch(err => console.log(err));

    let series=[];
    let labels=[];
    CapacityListByRegion.reduce((acc,value)=>{
        if(!acc[value.buildingName])
        {
            acc[value.buildingName]={data:[],name:value.buildingName};
            series.push({data:[],name:value.buildingName});
        }
    
        if(!labels.find(lbl=>lbl==value._id))
        {
            labels.push(value._id);
        }
    
       var seri= series.find(element=>element.name==value.buildingName)
       seri.data[labels.indexOf(value._id)]=value.consumptionAmount;
        acc[value.buildingName].data.push(value.consumptionAmount);
         return acc
    },{});
    res.send(Response({"series":series,"labels":labels}));
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