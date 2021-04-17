/**
 * @author MjImani
 * phone : +989035074205
 */

const GasSharing = require('../../../model/sharing/gasSharing.model');
const PowerReceipt=require('../../../model/receipt/powerReceipt.model')

module.exports = {
    getRawBillAnalysis
};


async function getRawBillAnalysis(req) {
    try {




        return await PowerReceipt
            .aggregate(
                [ 
                    // فییلتر زمان
                    
                    {
                        "$match": {
                        "fromDate": {
                            "$gte":  req.fromDate,
                        },
                        "toDate": {
                            "$lte": req.toDate,
                        }
                        }
                    },

              
                    
                                    
                    { $addFields: { "powerSharingobjectId": { "$toObjectId": "$powerSharingId" }}},

                    {$lookup:
                        {
                        from:  "powersharings",
                        localField: "powerSharingobjectId",
                        foreignField: "_id",
                        as: "powersharing"
                        }
                    },
                    {$project :
                    {
                        powerPrice:1,
                        period:1,
                        consumptionAmount:1,
                        buildings: { $arrayElemAt: [ "$powersharing.buildingList", 0] },           
                    }
                    },
                    {$unwind  : { path: "$buildings" ,includeArrayIndex:"index",}  },
                    {$project :
                    {
                        buildingId:"$buildings.buildingId",
                        powerPrice:1,
                        period:1,
                        consumptionAmount:1,
                    }
                    },
                    {$lookup:
                    {
                    from:  "buildings",
                    localField: "buildingId",
                    foreignField: "_id",
                    as: "building"
                    }
                    },
                    {$project: {
                            regionId: { $arrayElemAt: [ "$building.regionId", 0] },
                            powerPrice:1,
                        period:1,
                        consumptionAmount:1,
                        }
                    },  
                    {$group:
                        {
                        _id: { period: "$period" , regionId: "$regionId"},
                        period : { $first: '$period' },
                        regionId : { $first: '$regionId' },
                        totalAmount: { $sum: "$powerPrice" },
                        totalConsumption: { $sum: "$consumptionAmount" },
                        }
                    },
                    { $addFields: { "regionId_object": { "$toObjectId": "$regionId" }}},
                    {$lookup:{
                        from:  "regions",
                        localField: "regionId_object",
                        foreignField: "_id",
                        as: "region"
                        }
                    },
                    {$project: {
                        title: {$arrayElemAt: [ "$region.title", 0] },
                        period:1,
                        totalAmount:1,
                        totalConsumption:1,
                        _id:0,
                        
                        }
                    },
                ])
            .sort({createdAt: -1});
    } catch (e) {
        console.log(e);
    }
}