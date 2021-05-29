/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */

const WaterReceipt = require('../../model/receipt/waterReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
};

async function create(waterReceipt) {
    try {
        return await WaterReceipt.create(waterReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, waterReceipt) {
    try {
        return await WaterReceipt.updateOne({
                _id: id
            },
            waterReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await WaterReceipt.findOne({
                _id: id
            }
        );
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByFilter(filter,page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        return await WaterReceipt
        .aggregate(
            [
            // فییلتر زمان
    
            {"$match": {
                    "fromDate": {
                        "$gte":  filter.fromDate,
                    },
                    "toDate": {
                        "$lte": filter.toDate,
                    },
           
                }
            },

            { $addFields: { "SharingobjectId": { "$toObjectId": "$sharingId" }}},

            {$lookup:
                {
                from:  "sharings",
                localField: "SharingobjectId",
                foreignField: "_id",
                as: "sharing"
                }
            },
            {$project :
                {
                    _id:1,
                    fromDate:1,
                    toDate:1,
                    consumptionDurat :1,
                    consumptionAmount:1,
                    receiptType:1,
                    name:"$sharing.name",
                    billingId:"$sharing.billingId",       
                    buildingId:{ $first:"$sharing.buildingList.buildingId"},       
                }
            },
            {
                $lookup: {
                from: "buildings",
                localField: "buildingId",    // field in the orders collection
                foreignField: "_id",  // field in the items collection
                as: "building"
                }
            },
            {$project :
                {
                    _id:1,
                    fromDate:1,
                    toDate:1,
                    consumptionDurat :1,
                    consumptionAmount:1,
                    receiptType:1,
                    billingId:1,  
                    name:1,
                    regionId:"$building.regionId"
                }
            },
            { $match : { regionId : {$in: filter.regionIds} } } ,
            // فیلتر  شناسه پرداخت 
            {"$match": {"billingId": new RegExp(filter.billingId) }},
            { $sort: {fromDate: 1 } },

            {$facet: {
                paginatedResults: [{ $skip: skip }, { $limit: size }],
                totalCount: [
                    {
                    $count: 'count'
                    }
                ]
                }}
        ])
        .sort({createdAt: -1});

        
} catch (e) {
    console.log(e);
}
}


async function deleteById(id) {
    try {
        return await WaterReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}