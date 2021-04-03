/**
 * @author M.Reza hajjar
 */
const gasAnalysisDao = require('./gasAnalysis.dao');
const Response = require('../../../middleware/response/response-handler');


exports.capacity = async (req, res, next) => {
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
exports.consuption = async (req, res, next) => {
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
exports.contor = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await gasAnalysisDao
        .getContorListByRegion(this.regionId)
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
exports.shir = async (req, res, next) => {
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
            acc[value.capacity].data.push(value.Count*20);
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