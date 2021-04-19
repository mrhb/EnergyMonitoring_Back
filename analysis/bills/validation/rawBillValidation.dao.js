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
                        as: "reciept"
                        }
                    },
                    {$unwind  : { path: "$reciept" ,includeArrayIndex:"index",}  },
                    
                    //انتخاب تعرفه ها
                   {$lookup:
                         {
                           from: "tariffs",
                           let: { useType: "$useType", useCode: "$useCode" ,
                               recieptFromDate:"$reciept.fromDate" ,
                               recieptToDate:"$reciept.toDate" 
                               },
                           pipeline: [
                              { $match:
                                 { $expr:
                                    { $and:
                                       [
                                         { $eq: [ "$useType",  "$$useType" ] },
                                         { $eq: [ "$useCode", "$$useCode" ] },
                                         { $gte: [ "$$recieptFromDate" , "$fromDate"] },
                                         { $lte: [  "$$recieptToDate" , "$toDate" ] }
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
                        reciept:1,
                        tariffs: 1,           
                    }
                    },
                ])
            .sort({createdAt: -1});
    } catch (e) {
        console.log(e);
    }
}