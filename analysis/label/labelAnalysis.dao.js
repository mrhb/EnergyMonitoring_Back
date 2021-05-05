/**
 * @author MjImani
 * phone : +989035074205
 */

const SharingBase = require('../../model/sharing/sharingBase.model');


module.exports = {
    getBuildingDataAnalysis
};


async function getBuildingDataAnalysis(req) {
    try {
        return await SharingBase
            .aggregate(
                [ 
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
    //اطلاعات ساختمان
    {$lookup:
        {
        from:  "buildings",
        localField: "buildingId",
        foreignField: "_id",
        as: "building"
        }
     },
     {$set: 
         {building: {$arrayElemAt: ["$building", 0]}}
     },
     //اطلاعات منطقه
     {$addFields:
       { "regionObjectId": { "$toObjectId": "$building.regionId" }}
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
          "$gte":  req.fromDate,
      },
      "receipt.toDate": {
          "$lte": req.toDate,
      }
      }
  },                   
  {$project:
    {
        climateType: "$region.climateType",
        useFullArea: "$building.useFullArea",
        Type:{$ifNull: ["$carierType" ,"$receipt.receiptType"]},
        consumptionDurat: "$receipt.consumptionDurat"
    }
 },
   ]);

    } catch (e) {
        console.log(e);
    }
}