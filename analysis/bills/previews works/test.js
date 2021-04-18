var cal_Gom = require('./Tarrif/Gom')
 var moment = require('../../../node_modules/jalali-moment/jalali-moment');

 
var item=  {
    "reciept" : {
        "period" : "FOURTH",
        "paymentCode" : "1239843564323",
        // "fromDate" : ISODate("2021-02-19T20:30:00.000Z"),
        // "toDate" : ISODate("2021-03-20T20:30:00.000Z"),
        "numberDays" : 29,
        "intermediate" : {
            "preCounter" : "12",
            "currentCounter" : "1",
            "coefficient" : "2",
            "totalConsumption" : "212",
            "consumptionAfterLastChange" : "121",
            "nerkh" : "21",
            "mablagh" : "21"
        },
        "peakLoad" : {
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "21",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "212",
            "nerkh" : "121",
            "mablagh" : "21"
        },
        "lowLoad" : {
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "21",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "21",
            "nerkh" : "21",
            "mablagh" : "21"
        },
        "peakTimesFriday" : {
            "preCounter" : "21",
            "currentCounter" : "21",
            "coefficient" : "2121",
            "totalConsumption" : "21",
            "consumptionAfterLastChange" : "21",
            "nerkh" : "12",
            "mablagh" : "21"
        },
        "reactive" : {
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
        // "paymentDeadLine" : ISODate("1986-12-31T20:30:00.000Z"),
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
        // "createdAt" : ISODate("2021-04-18T07:36:30.725Z"),
        // "updatedAt" : ISODate("2021-04-18T07:53:59.950Z"),
        "__v" : 0,
        "debt" : null,
        "electricalTolls" : null,
        "numberShare" : null,
        "vat" : null
    },
    "tariffs" : [ 
        {
            "group" : "POWER",
            "dataType" : "power1Tariff",
            // "fromDate" : ISODate("2020-03-20T20:30:00.000Z"),
            // "toDate" : ISODate("2021-03-20T20:30:00.000Z"),
            // "approvalDate" : ISODate("2020-03-20T20:30:00.000Z"),
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
                "demandPrice" : 132423
            },
            // "createdAt" : ISODate("2021-04-18T09:59:31.685Z"),
            // "updatedAt" : ISODate("2021-04-18T09:59:31.685Z"),
            "__v" : 0
        }
    ]
}

param=item.tariffs[0].params;

// const params=[
//     {
//         "Eblagh":"1397/02/09",
//         "garmsMonth":[0,0,1,1,1,1,0,0,0,0,0,0],
//         "x":[100,200,300,400,500,600],
//         "y":[490,571,1224,2203,2531,3184,3511],
//         "x_garm":[1000,2000,3000,3500,4500,6000],
//         "y_garm":[360,816,1388,1714,2042,2203,2368],
//         "coeff":2,
//         "demandPrice":57175
//     }]

//jomiee,low,middle,higth,var
var kwh=[item.reciept.intermediate.totalConsumption,
    item.reciept.peakLoad.totalConsumption,
    item.reciept.lowLoad.totalConsumption,
    item.reciept.peakTimesFriday.totalConsumption,
    item.reciept.reactive.totalConsumption
];
console.log("qqqqqqqqqqq"+kwh)
//  kwh=[1,12,16,40,50];


    
startDate = moment.from("1397/06/01", 'fa', 'YYYY/MM/DD');
endDate = moment.from("1397/08/01", 'fa', 'YYYY/MM/DD');

// var startDate="1397/06/01";
// var endDate="1397/08/01";
var demandM=320;//دیماند مصرفی
var demandG=1400; //دیماند قراردادی
console.log(cal_Gom(kwh,demandM,demandG,startDate,endDate,param));
