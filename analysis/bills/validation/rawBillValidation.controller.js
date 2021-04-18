/**
 * @author M.Reza hajjar
 */
const rawBillValidation = require('./rawBillValidation.dao');
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

    
    let BillTariffs = await rawBillValidation
    .getPowerBillTariffs(reqRawBillAnalysis)
    .then(result => {
        console.log(result)
        return result;
    }).catch(err => console.log(err));



    let series=[];
    let labels=[];
    // CapacityListByRegion.reduce((acc,value)=>{
    //     if(!acc[value.title])
    //     {
    //         acc[value.title]={data:[],name:value.title};
    //         series.push({data:[],name:value.title});
    //     }
    
    //     if(!labels.find(lbl=>lbl==value.period))
    //     {
    //         labels.push(value.period);
    //     }
    
    //    var seri= series.find(element=>element.name==value.title)
    //    seri.data[labels.indexOf(value.period)]=value.totalAmount;
    //     acc[value.title].data.push(value.totalAmount);
    //      return acc
    // },{});
    res.send(Response({"series":series,"labels":labels}));
};
exports.consumption = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await rawBillValidation
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