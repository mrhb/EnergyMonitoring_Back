var moment = require('jalali-moment');
var PieceCost = require('../PieceCost')


var item=  {
    "_id" : ObjectId("607bb8c41408c414b824c800"),
    "reciept" : {
        "_id" : ObjectId("607be17ea9e9ed2a1422f7e0"),
        "period" : "FOURTH",
        "paymentCode" : "1239843564323",
        "fromDate" : ISODate("2021-02-19T20:30:00.000Z"),
        "toDate" : ISODate("2021-03-20T20:30:00.000Z"),
        "numberDays" : 29,
        "intermediate" : {
            "_id" : ObjectId("607be17ea9e9ed2a1422f7e1"),
            "preCounter" : "12",
            "currentCounter" : "1",
            "coefficient" : "2",
            "totalConsumption" : "212",
            "consumptionAfterLastChange" : "121",
            "nerkh" : "21",
            "mablagh" : "21"
        },
        "peakLoad" : {
            "_id" : ObjectId("607be17ea9e9ed2a1422f7e2"),
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "21",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "212",
            "nerkh" : "121",
            "mablagh" : "21"
        },
        "lowLoad" : {
            "_id" : ObjectId("607be17ea9e9ed2a1422f7e3"),
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "21",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "21",
            "nerkh" : "21",
            "mablagh" : "21"
        },
        "peakTimesFriday" : {
            "_id" : ObjectId("607be17ea9e9ed2a1422f7e4"),
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "2121",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "21",
            "nerkh" : "12",
            "mablagh" : "21"
        },
        "reactive" : {
            "_id" : ObjectId("607be17ea9e9ed2a1422f7e5"),
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "21",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "21",
            "nerkh" : "21",
            "mablagh" : "21"
        },
        "contractualPower" : "87",
        "calculatedPower" : "87",
        "maximeterNumber" : "87",
        "powerConsumption" : "87",
        "badConsumptionLossRatio" : "87",
        "paymentDeadLine" : ISODate("1986-12-31T20:30:00.000Z"),
        "consumptionAmount" : 12,
        "subscription" : "12",
        "powerPrice" : 12,
        "seasonPrice" : 21,
        "badPenaltiesForConsuming" : 2,
        "payableAmount" : 1,
        "powerSharingId" : "607bb8c41408c414b824c800",
        "nameShare" : "ساختمان سهند",
        "creatorId" : "6072dbc2bfb0101ec8bdcaa0",
        "ownerId" : "6072dbc2bfb0101ec8bdcaa0",
        "createdAt" : ISODate("2021-04-18T07:36:30.725Z"),
        "updatedAt" : ISODate("2021-04-18T07:53:59.950Z"),
        "__v" : 0,
        "debt" : null,
        "electricalTolls" : null,
        "numberShare" : null,
        "vat" : null
    },
    "tariffs" : [ 
        {
            "_id" : ObjectId("607c0303a9e9ed2a1422f8d4"),
            "group" : "POWER",
            "dataType" : "power1Tariff",
            "fromDate" : ISODate("2020-03-20T20:30:00.000Z"),
            "toDate" : ISODate("2021-03-20T20:30:00.000Z"),
            "approvalDate" : ISODate("2020-03-20T20:30:00.000Z"),
            "useType" : "HOME",
            "useCode" : "WARM_TROPICAL_4",
            "params" : {
                "garmsMonth" : [ 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true, 
                    true
                ],
                "x" : [ 
                    100, 
                    200, 
                    300, 
                    400, 
                    500, 
                    600
                ],
                "y" : [ 
                    234, 
                    35, 
                    34, 
                    345, 
                    344, 
                    345
                ],
                "xGarm" : [ 
                    234, 
                    35, 
                    34, 
                    345, 
                    344, 
                    345
                ],
                "yGarm" : [ 
                    234, 
                    35, 
                    34, 
                    345, 
                    344, 
                    345
                ],
                "_id" : ObjectId("607c0303a9e9ed2a1422f8d5"),
                "demandPrice" : 132423
            },
            "createdAt" : ISODate("2021-04-18T09:59:31.685Z"),
            "updatedAt" : ISODate("2021-04-18T09:59:31.685Z"),
            "__v" : 0
        }
    ]
}


module.exports =  function(kwh,demandM,demandG,startDate,endDate) {
    //jomiee,low,middle,higth,var
const params=[
    {
        "Eblagh":"1397/02/09",
        "garmsMonth":[0,0,1,1,1,1,0,0,0,0,0,0],
        "x":[100,200,300,400,500,600],
        "y":[490,571,1224,2203,2531,3184,3511],
        "x_garm":[1000,2000,3000,3500,4500,6000],
        "y_garm":[360,816,1388,1714,2042,2203,2368],
        "coeff":2,
        "demandPrice":57175
    }]

param=params[0];
    
start = moment.from(startDate, 'fa', 'YYYY/MM/DD');
end = moment.from(endDate, 'fa', 'YYYY/MM/DD');
days=end.diff(start,'day');

    energy=kwh[0]+kwh[1]+kwh[2]+kwh[3];
    avg_energy=energy/days;
    
    varr=kwh[4];
    pf=Math.cos(Math.atan(varr/energy));

    zian=0
    if(pf<0.9)
    zian=(0.9/pf)-1;

    demandC=demandM;//دیماند محاسباتی
    if(demandM<0.9*demandG)
    demandC=0.9*demandG;


    DemandFactor=demandM*24*days;
    demandCost=demandC*param.demandPrice*days/30;

console.log(
    PieceCost(param.x,param.y,kwh[0],kwh[1],kwh[2],kwh[3])

);
    energyCost=kwh[0]+kwh[1]+kwh[2];
    varrCost=zian*(demandCost+energyCost);
    faslCost=0.2*(varrCost+demandCost+energyCost)/(29*days);
    totalCost=faslCost+varrCost+demandCost+energyCost;
    kwhCost=0;
    if(energyCost=0)
    kwhCost=totalCost/energyCost;
    kwhlowNorm=kwh[0]/(days*12);
    kwhmeanNorm=kwh[1]/(days*12);
    kwhhighNorm=kwh[2]/(days*12);
    

    return [energy,avg_energy,pf,zian,demandC,DemandFactor,
        demandCost,energyCost,varrCost,faslCost,totalCost,kwhCost];
}
    

// let xx=[0]
// taarif.x.map(function(num) {
// xx.push(num);
// xx.push(num+Number.MIN_VALUE);
// })

// // xx[xx.length - 1]=Number.MAX_VALUE;
// xx[xx.length ]=Number.MAX_VALUE;

// console.log("this is xx:   "+xx);



// let yy=[]
// taarif.y.map(function(num) {
//     yy.push(num);
//     yy.push(num);
// })
// // console.log("this is y:   "+taarif.y);
// console.log("this is yy:   "+yy);

// relu = Piecewise(xx, yy)