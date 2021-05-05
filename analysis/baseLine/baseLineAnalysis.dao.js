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


async function getClimateData(req) {
    try {
        return await Building
            .aggregate(
                [ 
                    {$addFields:
                        { "buildingIdString": { "$toString": "$_id" }}
                     },
                     {$match :
                         { buildingIdString:  req.buildingId } 
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
                         tempAvg:"$weathers.tempAvg"
                     }
                 },                     
                
                {"$match": {
                "forDate": {
                    "$gte":  req.fromDate,
                },
                "forDate": {
                    "$lte": req.toDate,
                }
                }
            },        
   ]);

    } catch (e) {
        console.log(e);
    }
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
          "$gte":  req.fromDate,
      },
      "receipt.toDate": {
          "$lte": req.toDate,
      }
      }
  },                   
  {$project:
    {
        _id:0,
        Type:{$ifNull: ["$carierType" ,"$receipt.receiptType"]},
        consumptionDurat: "$receipt.consumptionDurat",
        fromDate: "$receipt.fromDate",
        toDate: "$receipt.toDate"
    }
 }
   ]);

    } catch (e) {
        console.log(e);
    }
}