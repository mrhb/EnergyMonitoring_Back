/**
 * @author M.Reza hajjar
 */
const normalizedBillAnalysis = require('./normalizedBillAnalysis.dao');
const Response = require('../../../middleware/response/response-handler');


exports.cost = async (req, res, next) => {
//    console.log('user.id ' + req.user.id);
    if (req.body.regionId){
        this.regionId = req.body.regionId;
    }else {
        this.regionId = "";
    }


    let CapacityListByRegion = await gasAnalysisDao
    .getCapacityListByRegion(this.regionId)
    .then(result => {
        return result;
    }).catch(err => console.log(err));

    let series=[];
    let labels=[];
    CapacityListByRegion.reduce((acc,value)=>{
        if(!acc[value.capacity])
        {
            acc[value.capacity]={data:[],name:value.capacity};
            series.push({data:[],name:value.capacity});
        }
    
        if(!labels.find(lbl=>lbl==value.title))
        {
            labels.push(value.title);
        }
    
       var seri= series.find(element=>element.name==value.capacity)
       seri.data[labels.indexOf(value.title)]=value.Count;
        acc[value.capacity].data.push(value.Count);
         return acc
    },{});
    res.send(Response({"series":series,"labels":labels}));
};
exports.emount = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await gasAnalysisDao
        .getCapacityListByRegion(this.regionId)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    
        let series=[];
        let labels=[];
        CapacityListByRegion.reduce((acc,value)=>{
            if(!acc[value.capacity])
            {
                acc[value.capacity]={data:[],name:value.capacity};
                series.push({data:[],name:value.capacity});
            }
        
            if(!labels.find(lbl=>lbl==value.title))
            {
                labels.push(value.title);
            }
        
           var seri= series.find(element=>element.name==value.capacity)
           seri.data[labels.indexOf(value.title)]=value.Count;
            acc[value.capacity].data.push(value.Count);
             return acc
        },{});
        res.send(Response({"series":series,"labels":labels}));
    };