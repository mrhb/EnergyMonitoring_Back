/**
 * @author MjImani
 * phone : +989035074205
 */


module.exports = function (role) {
    return (req, res, next) => {
        if (role){
            if ('ROLE_' + role === req.user.authorities) {
                next();
            } else {
                res.sendStatus(401);
            }
        }else {
            next();
        }
    };
};
