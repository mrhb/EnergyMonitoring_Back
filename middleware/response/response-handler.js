/**
 * @author MjImani
 * +989035074205
 */
module.exports = response;

function response(data) {
    if (data !== null) {
        return {
            flag: true,
            data: data
        }
    } else {
        return {
            flag: false,
            message: "محتوایی برای نمایش موجود نیست."
        }
    }
}
