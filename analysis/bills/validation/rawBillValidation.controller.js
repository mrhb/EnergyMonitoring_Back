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

        var kwh=[item.receipt.intermediate.totalConsumption,
            item.receipt.peakLoad.totalConsumption,
            item.receipt.lowLoad.totalConsumption,
            item.receipt.peakTimesFriday.totalConsumption,
            item.receipt.reactive.totalConsumption
        ];
            startDate = moment.from("1397/06/01", 'fa', 'YYYY/MM/DD');
            endDate = moment.from("1397/08/01", 'fa', 'YYYY/MM/DD');

            var demandM=320;//دیماند مصرفی
            var demandG=1400; //دیماند قراردادی
            var cal=CalEnergyCost(kwh,demandM,demandG,startDate,endDate,param);

            item.energyCost=item.receipt.consumptionAmount;//cal[2];
            item.energyCal=item.receipt.consumptionAmount;

                
            
    });

    BillTariffs.reduce((acc,value)=>{
        if(!acc[value.receipt.period])
        {
            acc[value.receipt.period]={data:[],name:value.receipt.period};
            // series.push({data:[],name:value.receipt.period});
        }
    
        if(!labels.find(lbl=>lbl==value.receipt.period))
        {
            labels.push(value.receipt.period);
        }
    
       var seri= series[0]
       seri.data[labels.indexOf(value.receipt.period)]=value.energyCost;

       var seri= series[1]
       seri.data[labels.indexOf(value.receipt.period)]=value.energyCal;
       

        acc[value.receipt.period].data.push(value.totalAmount);
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
    
            if(!labels[value.receipt.period])
            {
                labels.push(value.receipt.period);
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