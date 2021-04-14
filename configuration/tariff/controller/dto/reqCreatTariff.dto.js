/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = ReqUpdateTariff;

function ReqUpdateTariff(data, userId, next) {
    validate(data, next);
// استان
    if (data.province !== null && data.province !== 'undefined') {
        this.province = data.province;
    }
//  نوع اقلیم 
    if (data.TariffType !== null && data.TariffType !== 'undefined') {
        this.TariffType = data.TariffType;
    }
// شهر    
    if (this.city !== null && this.city !== 'undefined') {
        this.city = data.city;
    }
    
    // this.billingId = data.billingId;
   

    // this.consumptionType = data.consumptionType;
    // this.TariffType = data.TariffType;

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
// TariffType: ['', [Validators.required]], //
// province: ['', [Validators.required]], // استان  
// city: ['', [Validators.required]], 

///
function validate(data, next) {
    if (!data.billingId) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    if (!data.TariffType) {
        throw next("نوع اقلیم نمیتواند خالی باشد.");
    }
    // if (data.TariffType !== 'DISELGEN' && data.TariffType !== 'PHOTOVOLTA' && data.TariffType !== 'GHP') {
    //     throw next("نوع اقلیم درست انتخاب نشده است.");
    // }
}

