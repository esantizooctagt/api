const Tax = require('../models/tax');
const Sequelize = require('sequelize');
const db = require('../config/database');

// const uuidv4 = require('uuid/v4');

// const mongoose = require('mongoose');
// const diffHistory = require('mongoose-diff-history/diffHistory');

exports.taxes_get_all = (req, res, next) => {
    const perPage = +req.params.perPage;
    const page = req.params.currPage || 1
    const search = req.params.searchValue;
    const skip = (perPage*page)-perPage;
    const companyId = req.params.companyId;
    condicion = {};

    if (search != undefined && search != null) {
        condicion = { where: { CompanyId: companyId, Name: { [Sequelize.Op.like]: '%'+search+'%' }}, offset: skip, limit: perPage };
    } else {
        condicion = { where: { CompanyId: companyId, Status: { [Sequelize.Op.in]: [0,1]} }, offset: skip, limit: perPage };
    }
    Tax.findAndCountAll(condicion)
        .then(result => {
            const taxes = 
                result.rows.map(tax => {
                    return {
                        Tax_Id: tax.TaxId,
                        Company_Id: tax.CompanyId,
                        Name: tax.Name,
                        Percentage: tax.Percentage,
                        Include_Tax: tax.Include_Tax,
                        Status: tax.Status
                    }
                });
            const pagesTotal = {
                page: page,
                pages: Math.ceil(result.count / perPage),
                count: result.count
            }
            
            res.status(200).send( { pagesTotal, taxes } );
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}

exports.tax_get_one = (req, res, next) => {
    const taxId = req.params.taxId;
    Tax.findByPk(taxId)
        .then(result => {
            if (result) {
                const tax = 
                {
                    Tax_Id: result.TaxId,
                    Company_Id: result.CompanyId,
                    Name: result.Name,
                    Percentage: result.Percentage,
                    Include_Tax: result.Include_Tax,
                    Status: result.Status
                }                
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
        CompanyId: req.body.Company_Id,
        Name: req.body.Name,
        Percentage: req.body.Percentage,
        Include_Tax: req.body.Include_Tax,
        Create_Date: Date.now(),
        Status: req.body.Status
    });
    tax
        .save()
        .then(result => {
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
    // [ { "propName": "name", "value": "Harry Potter" }]
    const taxId = req.params.taxId;
    const updateOps = {};  
    for (const [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
    }
    updateOps['Modified_Date'] = Date.now();
    Tax.update(updateOps, { where: { TaxId: taxId } }, { fields: ['Name','Percentage','Include_Tax','Status','Modified_Date']})
        .then(result => {
            res.status(200).json( { message: 'Tax updated' } );
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });

}

exports.delete_tax = (req, res, next) => {
    const taxId = req.params.taxId;

    Tax.findByPk(taxId)
        .then(result => {
            if (result) {
                db.query("SELECT COUNT(*) AS Result FROM INVOICES_DETAILS WHERE TAXID IN ('" + taxId + "')", { type: Sequelize.QueryTypes.SELECT})
                    .then(conteo => {
                        var resConteo = JSON.parse(JSON.stringify(conteo));
                        // We don't need spread here, since only the results will be returned for select queries
                        if (resConteo[0].Result > 0) {
                            Tax.update({ Status: 2 }, { where: { TaxId: taxId } })
                                .then(result => {
                                    res.status(200).json( { message: 'Tax deleted' } );
                                })
                                .catch(error => {
                                    console.log('Error: ' + error);
                                    res.status(500).json({ Error: error })
                                });
                        } else {
                            Tax.destroy({ where: { TaxId: taxId } })
                                .then(result => {
                                    console.log(result);
                                    res.status(200).json( { message: 'Tax deleted' } );
                                })
                                .catch(error => {
                                    console.log('Error: ' + error);
                                    res.status(500).json({ Error: error })
                                });
                        }
                    })
            }
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}
