/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const Tariff = require('../model/tariff.model');


module.exports = {
    getListPageableByFilter,
    getListPageableByFilterCount,
    getOne
    };

async function getListPageableByFilter(page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        return await Tariff
        .find({},
            {
                _id: 1,
                approvalDate:1, // تاریخ تصویب
                fromDate: 1, // اعتبار از تاریخ
                toDate: 1, //  اعتبار تا تاریخ
            })
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}


async function getListPageableByFilterCount() {
    try {
        return await Tariff
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await Tariff.findOne({
            _id: id
        },
        {
            _id: 1,
            approvalDate:1, // تاریخ تصویب
            fromDate: 1, // اعتبار از تاریخ
            toDate: 1, //  اعتبار تا تاریخ
        });
    } catch (e) {
        console.log(e);
    }
}