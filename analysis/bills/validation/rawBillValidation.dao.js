/**
 * @author MjImani
 * phone : +989035074205
 */

const GasSharing = require('../../../model/sharing/gasSharing.model');
const PowerSharing =require('../../../model/sharing/powerSharing.model');

module.exports = {
    getPowerBillTariffs
};


async function getPowerBillTariffs(req) {
    try {




        return await PowerSharing
            .aggregate(
                [ 
                    // فییلتر اشتراک
 
                    { $addFields: { "powerSharingStringId": { "$toString": "$_id" }}},
                    {
                        "$match": {
                        "powerSharingStringId": {
                            "$eq":  "607bb8c41408c414b824c800",
                            }
                        }
                    },
                    
                    {$lookup:
                        {
                        from:  "powerreceipts",
                        localField: "powerSharingStringId",
                        foreignField: "sharingId",
                        as: "receipt"
                        }
                    },
                    {$unwind  : { path: "$receipt" ,includeArrayIndex:"index",}  },
                    
                    //انتخاب تعرفه ها
                   {$lookup:
                         {
                           from: "tariffs",
                           let: { useType: "$useType", useCode: "$useCode" ,
                               receiptFromDate:"$receipt.fromDate" ,
                               receiptToDate:"$receipt.toDate" 
                               },
                           pipeline: [
                              { $match:
                                 { $expr:
                                    { $and:
                                       [
                                         { $eq: [ "$useType",  "$$useType" ] },
                                         { $eq: [ "$useCode", "$$useCode" ] },
                                         { $gte: [ "$$receiptFromDate" , "$fromDate"] },
                                         { $lte: [  "$$receiptToDate" , "$toDate" ] }
                                       ]
                                    }
                                 }
                              }
                           ],
                           as: "tariffs"
                         }
                    },
                    {$project :
                    {
                        powerPrice:1,
                        period:1,
                        receipt:1,
                        tariffs: 1,           
                    }
                    },
                ])
            .sort({createdAt: -1});
    } catch (e) {
        console.log(e);
    }
}