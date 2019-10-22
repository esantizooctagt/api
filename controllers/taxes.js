const Tax = require('../models/tax');
const db = require('../config/database');
const uuidv4 = require('uuid/v4');


exports.taxes_get_all = (req, res, next) => {
    Tax.findAll()
        .then(taxes => {
            res.status(200).json({ taxes });
        })
        .catch(error => console.log('Error: ' + error));
}

exports.tax_get_one = (req, res, next) => {
    const taxId = req.params.taxId;

    Tax.findAll({
        where : {
            TaxId: taxId
        } 
    })
    .then(tax => {
        res.status(200).json({ tax });
    })
    .catch(error => console.log('Error: ' + error));
}

exports.create_tax = (req, res, next) => {
    const tax = new Tax({
        CompanyId: req.body.CompanyId,
        Name: req.body.Name,
        Percentage: req.body.Percentage,
        Include_Tax: req.body.Include_Tax,
        Status: req.body.Status
    });
    tax
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({ result });
        })
        .catch(error => console.log('Error: ' + error))
}

exports.update_tax = (req, res, next) => {
    Tax.update({
        Name: req.params.Name,
        Percentage: req.params.Percentage,
        Include_Tax: req.para.Include_Tax,
        Modified_Date: db.NOW,
        Status: req.params.Status
      },{
        where: {
            TaxId: taxId
        }
    })
    .then(result => {
        console.log(result);
        res.status(201).json({ result });
    })
    .catch(error => console.log('Error: ' + error));
}

exports.delete_tax = (req, res, next) => {
    const taxId = req.params.taxId;

    Tax.update({
        Modified_Date: db.NOW,
        Status: 0
      },{
        where: {
            TaxId: taxId
        }
    })
    .then(result => {
        console.log(result);
        res.status(201).json({ result });
    })
    .catch(error => console.log('Error: ' + error));
}