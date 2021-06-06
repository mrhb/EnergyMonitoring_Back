/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */

const GenerationReceipt = require('../model/generationReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
    getListPageableByFilterCount
};

async function create(generationReceipt) {
    try {
        return await GenerationReceipt.create(generationReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, generationReceipt) {
    try {
        return await GenerationReceipt.updateOne({
                _id: id
            },
            generationReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await GenerationReceipt.findOne({
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
        return await GenerationReceipt
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
                    generationType: "$sharing.generationType",
                    consumptionType: "$sharing.consumptionType",           
                    capacity: "$sharing.capacity",
                    energyCarrier:{ $first:"$sharing.energyCarrier"},
                  //  billingId:"$sharing.billingId",       
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

                    // generationType: { $arrayElemAt: [ "$generationsharing.generationType", 0] },           
                    // consumptionType: { $arrayElemAt: [ "$generationsharing.consumptionType", 0] },           
                    // capacity: { $arrayElemAt: [ "$generationsharing.capacity", 0] },           

                    generationType:1,           
                    consumptionType: 1,           
                    capacity:1,           
        
                   // billingId:1,  
                    name:1,
                    generationType:1,
                    consumptionType:1,
                    capacity:1,
                    regionId:"$building.regionId"
                }
            },
            { $match : { regionId : {$in: filter.regionIds} } } ,
            // فیلتر  نام مشترک 
           {"$match": {"name": new RegExp(filter.billingId) }},
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

async function getListPageableByFilterCount() {
    try {
        return await GenerationReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await GenerationReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}