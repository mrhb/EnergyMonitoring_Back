/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */

const EnergyReceipt = require('../../model/receipt/energyReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
};

async function create(energyReceipt) {
    try {
        return await EnergyReceipt.create(energyReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, energyReceipt) {
    try {
        return await EnergyReceipt.updateOne({
                _id: id
            },
            energyReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await EnergyReceipt.findOne({
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
        return await EnergyReceipt
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
                    receiptType:1,
                    energyCarrier:1,
                   // billingId:1,  
                    name:1,
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


async function deleteById(id) {
    try {
        return await EnergyReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}