const Tax = require('../models/tax');
const Log = require('../models/log');
const db = require('../config/database');
const uuidv4 = require('uuid/v4');


exports.taxes_get_all = (req, res, next) => {
    Tax.findAll()
//    .select(TaxId, CompanyId, Name, Percentage, Include_Tax, Status)
    .then(taxes => {
        const response = 
            taxes.map(tax => {
                return {
                    TaxId: tax.TaxId,
                    CompanyId: tax.CompanyId,
                    Name: tax.Name,
                    Percentage: tax.Percentage,
                    Include_Tax: tax.Include_Tax,
                    Status: tax.Status
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

    Tax.findAll({
        where : {
            TaxId: taxId
        } 
    })
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
        CompanyId: req.body.CompanyId,
        Name: req.body.Name,
        Percentage: req.body.Percentage,
        Include_Tax: req.body.Include_Tax,
        Status: req.body.Status
    });
    tax.save()
    .then(result => {
        console.log(result);
        res.status(201).json( result );
    })
    .catch(error => {
        console.log('Error: ' + error);
        res.status(500).json({ Error: error })
    });
}

exports.update_tax = (async (req, res, next) => {
    /* Name: req.params.Name,
        Percentage: req.params.Percentage,
        Include_Tax: req.para.Include_Tax,
        Modified_Date: db.NOW,
        Status: req.params.Status*/
    const taxId = req.params.taxId;
    const updateOps = {};  // [ { "propName": "name", "value": "Harry Potter" }]
    for (const [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
    }
    
    try {
        const transaction = await db.transaction();
        let tax = await Tax.update( updateOps, { where: { TaxId: taxId },  transaction });
    
        let log = await Log.create({
            Table_Name: 'TAXES',
            Old_Data: 'ABC',
            New_Data: 'CDV',
            CompanyId: '89b3fb09-9688-4b36-b3b9-c385c7dedbb0',
            UserId: '564d231e-f90c-4eda-8ebd-1a327d74c226'
        }, { transaction });

        await transaction.commit();
        console.log(tax);
        //console.log(log);
        res.status(200).json( { Message: 'Transaction succesfully' });
    // .then(result => {
    //     console.log(result);
    //     res.status(200).json( result );
    // })
    // .catch(error => {
    //     console.log('Error: ' + error);
    //     res.status(500).json({ Error: error })
    // });
    }
    catch (err)
    {
        if (transaction) await transaction.rollback();
    }
});

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
        res.status(200).json( result );
    })
    .catch(error => {
        console.log('Error: ' + error);
        res.status(500).json({ Error: error })
    });
}