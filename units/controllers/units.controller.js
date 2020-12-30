const unitModel = require('../models/units.model');
// const crypto = require('crypto');

exports.insert = (req, res) => {
    unitModel.create(req.body)  .then((result) => {
        res.status(201).send({id: result._id});
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    unitModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    unitModel.findById(req.params.id)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    unitModel.patchUnit(req.params.id, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    unitModel.removeById(req.params.id)
        .then((result)=>{
            res.status(204).send({});
        });
};
