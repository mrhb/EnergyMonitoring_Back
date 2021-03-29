/**
 * @author M.Reza hajjar
 */
const powerAnalysisDao = require('./powerAnalysis.dao');
const Response = require('../../../middleware/response/response-handler');


exports.demandPenalty = async (req, res, next) => {
//    console.log('user.id ' + req.user.id);
    if (req.body.regionId){
        this.regionId = req.body.regionId;
    }else {
        this.regionId = "";
    }


    let CapacityListByRegion = await powerAnalysisDao
    .getDemandPenaltyAnalysis(this.regionId)
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
exports.demand = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await powerAnalysisDao
        .getDemandAnalysis(this.regionId)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

        let series=[];
        let labels=[];
        CapacityListByRegion.reduce((acc,value)=>{
            if(!acc[value.group])
            {
                acc[value.group]={data:[],name:value.group};
                series.push({data:[],name:value.group});
            }
        
            if(!labels.find(lbl=>lbl==value.title))
            {
                labels.push(value.title);
            }
        
           var seri= series.find(element=>element.name==value.group)
           seri.data[labels.indexOf(value.title)]=value.Count;
            acc[value.group].data.push(value.Count);
             return acc
        },{});
        res.send(Response({"series":series,"labels":labels}));
    };
exports.demandSum = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await powerAnalysisDao
        .getDemandAnalysis(this.regionId)
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
exports.reactive = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await powerAnalysisDao
        .getReactiveAnalysis(this.regionId)
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
exports.tariff = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await powerAnalysisDao
        .getTariffAnalysis(this.regionId)
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
exports.voltage = async (req, res, next) => {
    //    console.log('user.id ' + req.user.id);
        if (req.body.regionId){
            this.regionId = req.body.regionId;
        }else {
            this.regionId = "";
        }
    
    
        let CapacityListByRegion = await powerAnalysisDao
        .getVoltageAnalysis(this.regionId)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    
        let series=[];
        let labels=[];
        CapacityListByRegion.reduce((acc,value)=>{
            if(!acc[value.powerSupplyVoltage])
            {
                acc[value.powerSupplyVoltage]={data:[],name:value.powerSupplyVoltage};
                series.push({data:[],name:value.powerSupplyVoltage});
            }
        
            if(!labels.find(lbl=>lbl==value.title))
            {
                labels.push(value.title);
            }
        
           var seri= series.find(element=>element.name==value.powerSupplyVoltage)
           seri.data[labels.indexOf(value.title)]=value.Count;
            acc[value.powerSupplyVoltage].data.push(value.Count);
             return acc
        },{});
        res.send(Response({"series":series,"labels":labels}));
    };            