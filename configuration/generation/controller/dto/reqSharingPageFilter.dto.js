/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqSharingPageFilterDto;

function ReqSharingPageFilterDto(data) {
    if (data.regionId){
        this.regionId = data.regionId;
    }else {
        this.regionId = "";
    }
}