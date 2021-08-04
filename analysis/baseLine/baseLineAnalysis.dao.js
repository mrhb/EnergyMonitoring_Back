/**
 * @author MjImani
 * phone : +989035074205
 */

const SharingBase = require('../../model/sharing/sharingBase.model');
const Building = require('../../model/building/building.model');


module.exports = {
    getClimateData,
    getBillData
};


async function getClimateData(fromDate,toDate,buildingId) {
    try {
        return await Building
            .aggregate(
                [ 
                    {$addFields:
                        { "buildingIdString": { "$toString": "$_id" }}
                     },
                     {$match :
                         { buildingIdString:  buildingId } 
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
                         _id:0,
                         weathers:"$region.dailyweathers"
                     }
                  },
                  
                          {$unwind  : { path: "$weathers" }  },
                        {$project:
                     {
                         forDate:"$weathers.forDate",
                         tempAvg:"$weathers.tempAvg",
                     }
                 },                     
                
                {"$match": {
                "forDate": {
                    "$gte":  fromDate,
                },
                "forDate": {
                    "$lte": toDate,
                }
                }
            },        
   ]);

    } catch (e) {
        console.log(e);
    }
}

async function getBillData(CarierType,fromDate,toDate,buildingId) {
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
        { buildingIdString: buildingId } 
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
          "$lte":  toDate,
      },
      "receipt.toDate": {
          "$gte": fromDate,
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
{ $match : { receiptType:CarierType } },
{ $sort : { fromDate : 1 } },
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