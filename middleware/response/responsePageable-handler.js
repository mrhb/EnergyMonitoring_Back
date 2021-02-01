/**
 * @author MjImani
 * +989035074205
 */
module.exports = responsePageable;

function responsePageable(dataList, totalElements, page, size) {
    if (dataList !== null) {
        return {
            flag: true,
            content: dataList,
            totalElements: Number(totalElements),
            page: Number(page),
            size: Number(size),
            first: (Number(page) === 0),
            last: (((page * size) + size) >= (Number(totalElements)))
        }
    } else {
        return {
            flag: false,
            message: "محتوایی برای نمایش موجود نیست."
        }
    }
}
