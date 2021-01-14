/**
 * @author MjImani
 * +989035074205
 */
module.exports = response;

function response(data) {
    if (data) {
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

//
// function message(keyword, message) {
//     if (flag) {
//         return {
//             flag: true,
//             data: message
//         }
//     } else {
//         return {
//             flag: false,
//             message: "محتوایی برای نمایش موجود نیست."
//         }
//     }
// }
