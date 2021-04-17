/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = ReqCreatePower1Tariff;

function ReqCreatePower1Tariff(data, userId, next) {
    validate(data, next);
// تاریخ شروع اعتبار
    if (data.fromDate !== null && data.fromDate !== 'undefined') {
        this.fromDate = data.fromDate;
    }
// تاریخ اتمام اعتبار
    if (data.toDate !== null && data.toDate !== 'undefined') {
            this.toDate = data.toDate;
        }

    
    this.approvalDate = data.approvalDate;
    this.garmsMonth=data.garmsMonth
    this.kind = data.kind;
    this.useType = data.useType;
    this.useCode = data.useCode;
    this.params = data.params;
   
    this.creatorId = userId;
    this.ownerId = userId;
}


///
// TariffType: ['', [Validators.required]], //
// province: ['', [Validators.required]], // استان  
// city: ['', [Validators.required]], 

///
function validate(data, next) {
    // if (!data.billingId) {
    //     throw next("شناسه اقلیم نمیتواند خالی باشد.");
    // }
    // if (!data.TariffType) {
    //     throw next("نوع اقلیم نمیتواند خالی باشد.");
    // }
    // if (data.TariffType !== 'DISELGEN' && data.TariffType !== 'PHOTOVOLTA' && data.TariffType !== 'GHP') {
    //     throw next("نوع اقلیم درست انتخاب نشده است.");
    // }
}

