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
    getListPageableByFilterCount
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
                    // "receiptType" : filter.billType
                    
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
    fromDate:1,
    toDate:1,
    consumptionDurat :1,
    consumptionAmount:1,
    receiptType:1,
    billingId:{ $first:"$sharing.billingId"},       
}
},
// فیلتر  شناسه پرداخت 
// {"$match": {
//     "billingId": {
//         "$eq": "4183724179",
//     },
//     //"receiptType" :"powerReceipt"
    
// }
// },
{ $sort: {fromDate: 1 } },

 {$facet: {
      paginatedResults: [{ $skip: skip }, { $limit: size }],
      totalCount: [
        {
          $count: 'count'
        }
      ]
    }}
            ]
        )
        .sort({createdAt: -1});

        
} catch (e) {
    console.log(e);
}
}

// async function getListPageableByFilter(page, size) {
//     try {
//         let skip = (page * size);
//         if (skip < 0) {
//             skip = 0;
//         }
//         return await WaterReceipt
//             .find()
//             .sort({createdAt: -1})
//             .skip(Number(skip))
//             .limit(Number(size));
//     } catch (e) {
//         console.log(e);
//     }
// }

async function getListPageableByFilterCount() {
    try {
        return await WaterReceipt
            .find()
            .countDocuments();
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