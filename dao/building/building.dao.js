/**
 * @author MjImani
 * phone : +989035074205
 */

const Building = require('../../model/building/building.model');

module.exports = {
    create,
    update,
    createSpace,
    updateSpace,
    deleteSpace
};

async function create(reqCreateBuildingDto) {
    try {
        return await Building.create({
            regionId: reqCreateBuildingDto.regionId,
            name: reqCreateBuildingDto.name,
            useType: reqCreateBuildingDto.useType,
            constructionYear: reqCreateBuildingDto.constructionYear,
            floorNum: reqCreateBuildingDto.floorNum,
            exploitationPersonnelNum: reqCreateBuildingDto.exploitationPersonnelNum,
            postalCode: reqCreateBuildingDto.postalCode,
            address: reqCreateBuildingDto.address,
            ownership: reqCreateBuildingDto.ownership,
            creatorId: reqCreateBuildingDto.creatorId,
            ownerId: reqCreateBuildingDto.ownerId,
        });
    } catch (e) {
        console.log(e);
    }
}

async function update(id, reqCreateBuildingDto) {
    try {
        return await Building.updateOne({
            _id: id
        },{
            regionId: reqCreateBuildingDto.regionId,
            name: reqCreateBuildingDto.name,
            useType: reqCreateBuildingDto.useType,
            constructionYear: reqCreateBuildingDto.constructionYear,
            floorNum: reqCreateBuildingDto.floorNum,
            exploitationPersonnelNum: reqCreateBuildingDto.exploitationPersonnelNum,
            postalCode: reqCreateBuildingDto.postalCode,
            address: reqCreateBuildingDto.address,
            ownership: reqCreateBuildingDto.ownership,
        });
    } catch (e) {
        console.log(e);
    }
}

async function createSpace(id, reqBuildingSpace) {
    try {
        return await Building.updateOne({
            _id: id
        },{
            $push : {
                spaceList: reqBuildingSpace
            }
        });
    } catch (e) {
        console.log(e);
    }
}


async function updateSpace(id, reqBuildingSpace) {
    try {
        return await Building.updateOne({
            _id: id,
            spaceList: { $elemMatch: { _id: reqBuildingSpace._id}}
        },{
            $set : {
                "spaceList.$.name": reqBuildingSpace.name,
                "spaceList.$.number": reqBuildingSpace.number,
                "spaceList.$.floorNum": reqBuildingSpace.floorNum,
                "spaceList.$.useType": reqBuildingSpace.useType,
                "spaceList.$.area": reqBuildingSpace.area
            }
        });
    } catch (e) {
        console.log(e);
    }
}
async function deleteSpace(id, spaceId) {
    try {
        return await Building.updateOne({
            _id: id
        },{
            $pull : {
                spaceList: {
                    _id : spaceId
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}
