/**
 * @author MjImani
 * phone : +989035074205
 */

const Region = require('./region.model');

module.exports = {
    getOne,
    getListByParentId,
    getChildsById,
    create,
    update,
    deleteById
};
async function getOne(id) {
    try {
        return await Region.findOne({
                _id: id
            }
        );
    } catch (e) {
        console.log(e);
    }
}


async function getListByParentId(parentId) {
    try {
        return await Region.find({
            parentId: parentId
        });
    } catch (e) {
        console.log(e);
    }
}

async function getChildsById(Id) {
    try {
        return await Region.aggregate([
            { $addFields: { "parentId_string": { "$toString": "$_id" }}},
            {"$match": {
                    "parentId_string": {"$eq":  Id}
                }
            }, 
        
            {
              $graphLookup: {
                 from: "regions",
                 startWith: "$_id",
                 connectFromField: "_id",
                 connectToField: "parentId",
                 as: "childs"
              }
           },
            {$unwind  : { path: "$childs" ,includeArrayIndex:"index",}  },
            {$project :
                {
                    "_id":{ "$toString": "$childs._id" }
                }
             }
            
        ]);
    } catch (e) {
        console.log(e);
    }
}
async function create(region) {
    try {
        return await Region.create(region);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, region) {
    try {
        return await Region.updateOne({
                _id: id
            },
            region
        );
    } catch (e) {
        console.log(e);
    }
}
async function deleteById(id) {
    try {
        return await Region.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}
