/**
 * @author M.Reza hajjar
 */
const rawBillValidation = require('./rawBillValidation.dao');
const ReqRawBillAnalysis = require('./reqRawBillAnalysis.dto');
const CalEnergyCost=require('./calEnergyCost');


var moment = require('../../../node_modules/jalali-moment/jalali-moment');


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



    let series=[{data:[],name:'Cost'},{data:[],name:'cal'}];
    let labels=[];


    BillTariffs.forEach(item => {

        param=item.tariffs[0].params;

        var kwh=[item.reciept.intermediate.totalConsumption,
            item.reciept.peakLoad.totalConsumption,
            item.reciept.lowLoad.totalConsumption,
            item.reciept.peakTimesFriday.totalConsumption,
            item.reciept.reactive.totalConsumption
        ];
            startDate = moment.from("1397/06/01", 'fa', 'YYYY/MM/DD');
            endDate = moment.from("1397/08/01", 'fa', 'YYYY/MM/DD');

            var demandM=320;//دیماند مصرفی
            var demandG=1400; //دیماند قراردادی
            var cal=CalEnergyCost(kwh,demandM,demandG,startDate,endDate,param);

            item.energyCost=item.reciept.consumptionAmount;//cal[2];
            item.energyCal=item.reciept.consumptionAmount;

                
            
    });

    BillTariffs.reduce((acc,value)=>{
        if(!acc[value.reciept.period])
        {
            acc[value.reciept.period]={data:[],name:value.reciept.period};
            // series.push({data:[],name:value.reciept.period});
        }
    
        if(!labels.find(lbl=>lbl==value.reciept.period))
        {
            labels.push(value.reciept.period);
        }
    
       var seri= series[0]
       seri.data[labels.indexOf(value.reciept.period)]=value.energyCost;

       var seri= series[1]
       seri.data[labels.indexOf(value.reciept.period)]=value.energyCal;
       

        acc[value.reciept.period].data.push(value.totalAmount);
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
    
            if(!labels[value.reciept.period])
            {
                labels.push(value.reciept.period);
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