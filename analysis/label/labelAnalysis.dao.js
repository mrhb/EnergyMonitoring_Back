/**
 * @author MjImani
 * phone : +989035074205
 */

const SharingBase = require('../../model/sharing/sharingBase.model');
const Building = require('../../model/building/building.model');



module.exports = {
    getBuildingData,
    getBillData
};


async function getBuildingData(req) {


    try {
        return await Building.aggregate([
            {$addFields:
               { "buildingIdString": { "$toString": "$_id" }}
            },
            {$match :
                { buildingIdString:  req.buildingId   } 
            },
                //اطلاعات منطقه
             {$addFields:
               { "regionObjectId": { "$toObjectId": "$regionId" }}
            },
             {$lookup:
                {
                from:  "regions",
                localField: "regionObjectId",
                foreignField: "_id",
                as: "region"
                }
             },
             {$set: 
                 {region: {$arrayElemAt: ["$region", 0]}}
             },
             {$project:
                {
                    climateType: "$region.climateType",
                    useFullArea: "$useFullArea"
                }
             }
            
        ]);
    } catch (e) {
        console.log(e);
    }


//     try {
//         return await SharingBase
//             .aggregate(
//                 [ 
//     // فییلتر اشتراک
//     {$unwind  : { path: "$buildingList" ,includeArrayIndex:"index",}  },
//     {$project:
//        {
//            buildingId: "$buildingList.buildingId",
//            percent: "$buildingList.allocationPercentage",
//            carierType:"$energyCarrier"
//        }
//     },
//     {$addFields:
//        { "buildingIdString": { "$toString": "$buildingId" }}
//     },
//     {$match :
//         { buildingIdString:  req.buildingId } 
//     },
//     //اطلاعات ساختمان
//     {$lookup:
//         {
//         from:  "buildings",
//         localField: "buildingId",
//         foreignField: "_id",
//         as: "building"
//         }
//      },
//      {$set: 
//          {building: {$arrayElemAt: ["$building", 0]}}
//      },
//      //اطلاعات منطقه
//      {$addFields:
//        { "regionObjectId": { "$toObjectId": "$building.regionId" }}
//     },
//      {$lookup:
//         {
//         from:  "regions",
//         localField: "regionObjectId",
//         foreignField: "_id",
//         as: "region"
//         }
//      },
//      {$set: 
//          {region: {$arrayElemAt: ["$region", 0]}}
//      },
//      //اطلاعات قبض
//      {$addFields:
//        { "sharingStringId": { "$toString": "$_id" }}
//     },
//      {$lookup:
//         {
//         from:  "receipts",
//         localField: "sharingStringId",
//         foreignField: "sharingId",
//         as: "receipt"
//         }
//     },
//     {$unwind  : { path: "$receipt" }  },
    
//     {"$match": {
//       "receipt.fromDate": {
//           "$gte":  req.fromDate,
//       },
//       "receipt.toDate": {
//           "$lte": req.toDate,
//       }
//       }
//   },                   
//   {$project:
//     {
//         climateType: "$region.climateType",
//         useFullArea: "$building.useFullArea",
//         Type:{$ifNull: ["$carierType" ,"$receipt.receiptType"]},
//         consumptionDurat: "$receipt.consumptionDurat"
//     }
//  },
//    ]);

//     } catch (e) {
//         console.log(e);
//     }
}


async function getBillData(req) {
    try {
        return await SharingBase
            .aggregate([
              
// فییلتر اشتراک
    {$unwind  : { path: "$buildingList" ,includeArrayIndex:"index",}  },
    {$project:
       {
           buildingId: "$buildingList.buildingId",
           percent: "$buildingList.allocationPercentage",
           carierType:"$energyCarrier"
       }
    },
    {$addFields:
       { "buildingIdString": { "$toString": "$buildingId" }}
    },
    {$match :
        { buildingIdString:  req.buildingId } 
    },
  
     //اطلاعات قبض
     {$addFields:
       { "sharingStringId": { "$toString": "$_id" }}
    },
     {$lookup:
        {
        from:  "receipts",
        localField: "sharingStringId",
        foreignField: "sharingId",
        as: "receipt"
        }
    },
    {$unwind  : { path: "$receipt" }  },
    
    {"$match": {
      "receipt.fromDate": {
          "$lte":  req.toDate,
      },
      "receipt.toDate": {
          "$gte": req.fromDate,
      }
      }
  },                   
//   {$project:
//     {
//         _id:0,
//         Type:{$ifNull: ["$carierType" ,"$receipt.receiptType"]},
//         consumptionDurat: "$receipt.consumptionDurat",
//         fromDate: "$receipt.fromDate",
//         toDate: "$receipt.toDate"
//     }
//  },

 {$project :
    {
     Type:{$ifNull: ["$carierType" ,"$receipt.receiptType"]},
     intermediate:       { $ifNull: [ "$receipt.intermediate.totalConsumption", 0 ] },
     peakLoad:           { $ifNull: [ "$receipt.peakLoad.totalConsumption", 0 ] },
     lowLoad:            { $ifNull: [ "$receipt.lowLoad.totalConsumption", 0 ] },                     
     peakTimesFriday:    { $ifNull: [ "$receipt.peakTimesFriday.totalConsumption", 0 ] },    
     consumptionAmount:"$receipt.consumptionAmount",
     fromDate:"$receipt.fromDate",
     toDate:"$receipt.toDate",
     consumptionDurat :"$receipt.consumptionDurat",
     receiptType:"$receipt.receiptType",
     period:"$receipt.period",
    }
},
   {$project :
    {
        Type:1,
        fromDate:1,
        toDate:1,
        consumptionAmount  :1,
        consumptionDurat :
        {
          $switch:
            {
              branches: [
                {
                  case: { $eq :[  "$Type" , "powerReceipt"]},
                  then: { '$add' : [ '$intermediate','$peakLoad' ,'$lowLoad','$peakTimesFriday']}
                }
              ],
              default: "$consumptionDurat"
            }
         },
    }
},

   ]);

    } catch (e) {
        console.log(e);
    }
}