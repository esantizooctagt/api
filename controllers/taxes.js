const Tax = require('../models/tax');
const mongoose = require('mongoose');

exports.taxes_get_all = (req, res, next) => {
    const companyId = req.params.companyId;
    Tax.find({CompanyId: companyId})
        .exec()
        .then(taxes => {
            const response = 
                taxes.map(tax => {
                    return {
                        TaxId: tax._id,
                        CompanyId: tax.CompanyId,
                        Name: tax.Name,
                        Percentage: tax.Percentage,
                        Include_Tax: tax.Include_Tax,
                        Status: tax.Status,
                        URL: 'http://localhost:3000/taxes/' + tax._id
                    }
                })
            
            res.status(200).send( response );
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}

exports.tax_get_one = (req, res, next) => {
    const taxId = req.params.taxId;

    Tax.findById(taxId)
        .select('CompanyId Name Percentage Include_Tax Status')
        .exec()
        .then(tax => {
            if (tax) {
                res.status(200).json( tax );
            } else {
                res.status(404).json({ message: 'No valid entry found for tax ID' });
            }
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}

exports.create_tax = (req, res, next) => {
    const tax = new Tax({
        _id: new mongoose.Types.ObjectId(),
        CompanyId: req.body.CompanyId,
        Name: req.body.Name,
        Percentage: req.body.Percentage,
        Include_Tax: req.body.Include_Tax,
        Status: req.body.Status,
        Create_Date: Date.NOW
    });
    tax
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                taxes : { 
                    _id: result._id,
                    Name: result.Name
                }
            });
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}

exports.update_tax = (req, res, next) => {
    /* Name: req.params.Name,
        Percentage: req.params.Percentage,
        Include_Tax: req.para.Include_Tax,
        Modified_Date: db.NOW,
        Status: req.params.Status*/
    const taxId = req.params.taxId;
    const updateOps = {};  // [ { "propName": "name", "value": "Harry Potter" }]
    for (const [key, value]  of Object.entries(req.body)){
        updateOps[key] = value;
    }
    Tax.update({ _id: taxId }, { $set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json( { message: 'Tax updated' } );
    })
    .catch(error => {
        console.log('Error: ' + error);
        res.status(500).json({ Error: error })
    });
}

exports.delete_tax = (req, res, next) => {
    const taxId = req.params.taxId;
    Tax.deleteOne({ _id: taxId })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json( { message: 'Tax deleted' } );
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}