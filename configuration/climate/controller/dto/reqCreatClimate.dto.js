/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = ReqUpdateClimate;

function ReqUpdateClimate(data, userId, next) {
    validate(data, next);
// استان
    if (data.province !== null && data.province !== 'undefined') {
        this.province = data.province;
    }
//  نوع اقلیم 
    if (data.climateType !== null && data.climateType !== 'undefined') {
        this.climateType = data.climateType;
    }
// شهر    
    if (this.city !== null && this.city !== 'undefined') {
        this.city = data.city;
    }
    
    // this.billingId = data.billingId;
   

    // this.consumptionType = data.consumptionType;
    // this.climateType = data.climateType;

    // if (this.capacity !== null && this.capacity !== 'undefined') {
    //     this.capacity = data.capacity;
    // }
   
    // if (this.sewageBranchDiameter !== null && this.sewageBranchDiameter !== 'undefined') {
    //     this.sewageBranchDiameter = data.sewageBranchDiameter;
    // }
    // this.buildingNum = 0;
    // this.creatorId = userId;
    // this.ownerId = userId;
}


///
// climateType: ['', [Validators.required]], //
// province: ['', [Validators.required]], // استان  
// city: ['', [Validators.required]], 

///
function validate(data, next) {
    if (!data.billingId) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    if (!data.climateType) {
        throw next("نوع اقلیم نمیتواند خالی باشد.");
    }
    // if (data.climateType !== 'DISELGEN' && data.climateType !== 'PHOTOVOLTA' && data.climateType !== 'GHP') {
    //     throw next("نوع اقلیم درست انتخاب نشده است.");
    // }
}

