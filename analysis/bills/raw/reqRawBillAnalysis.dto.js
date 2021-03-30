/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
module.exports = ReqRawBillAnalysis;

function ReqRawBillAnalysis(data,next) {
    validate(data,next);
    this.regionId = data.regionId;
    this.billType = data.billType;
    this.billAnalysisParam = data.billAnalysisParam;
    this.fromDate = new Date(data.fromDate);
    this.toDate = new Date(data.toDate);
}

function validate(data, next) {
    if (!data.regionId) {
        throw next("شناسه منظقه نمیتواند خالی باشد.");
    }
    if (!data.billAnalysisType) {
        throw next("نوع  قبض انتخاب نشده است.");
    }
    if (!data.billAnalysisParam) {
        throw next("پارامتر هزینه یا مصرف را انتخاب کنید .");
    }
    if (!data.toDate) {
        throw next("تا تاریخ نمیتواند خالی باشد.");
    }
    if (new Date(data.fromDate).getTime() > new Date(data.toDate).getTime()) {
        throw next("تاریخ شروع نمیتواند بعد از تاریخ پایان باشد.");
    }

}
