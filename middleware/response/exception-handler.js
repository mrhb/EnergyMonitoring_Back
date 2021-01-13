/**
* @author MjImani
* +989035074205
*/
module.exports = exceptionHandler;

function exceptionHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application response
        return res.status(400).send({
            flag: false,
            message: err
        });
    }

    if (err.name === 'ValidationError') {
        // mongoose validation response
        return res.status(400).send({
            flag: false,
            message: err.message
        });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication response
        return res.status(401).send({
            flag: false,
            message: 'Unauthorized'
        });
    }

    // default to 500 server response
    return res.status(500).send({
        flag: false,
        message: err.message
    });
}
