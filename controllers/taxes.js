const Tax = require('../models/tax');
const Log = require('../models/log');
// const db = require('../config/database');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');


// exports.taxes_get_all = (req, res, next) => {
//     Tax.findAll()
// //    .select(TaxId, CompanyId, Name, Percentage, Include_Tax, Status)
//     .then(taxes => {
//         const response = 
//             taxes.map(tax => {
//                 return {
//                     TaxId: tax.TaxId,
//                     CompanyId: tax.CompanyId,
//                     Name: tax.Name,
//                     Percentage: tax.Percentage,
//                     Include_Tax: tax.Include_Tax,
//                     Status: tax.Status
//                 }
//             })
        
//         res.status(200).send( response );
//     })
//     .catch(error => {
//         console.log('Error: ' + error);
//         res.status(500).json({ Error: error })
//     });
// }
exports.taxes_get_all = (req, res, next) => {
    const companyId = req.params.companyId;
    Tax.find({ Company_Id: companyId })
        .exec()
        .then(taxes => {
            const response = 
                taxes.map(tax => {
                    return {
                        Tax_Id: tax._id,
                        Company_Id: tax.Company_Id,
                        Name: tax.Name,
                        Percentage: tax.Percentage,
                        Include_Tax: tax.Include_Tax,
                        Status: tax.Status
                        //URL: 'http://localhost:3000/taxes/' + tax._id
                    }
                })

            res.status(200).send( response );
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}

// exports.tax_get_one = (req, res, next) => {
//     const taxId = req.params.taxId;

//     Tax.findAll({
//         where : {
//             TaxId: taxId
//         } 
//     })
//     .then(tax => {
//         if (tax) {
//             res.status(200).json( tax );
//         } else {
//             res.status(404).json({ message: 'No valid entry found for tax ID' });
//         }
//     })
//     .catch(error => {
//         console.log('Error: ' + error);
//         res.status(500).json({ Error: error })
//     });
// }
exports.tax_get_one = (req, res, next) => {
    const taxId = req.params.taxId;

    Tax.findById(taxId)
        .select('_id CompanyId Name Percentage Include_Tax Status')
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

// exports.create_tax = (req, res, next) => {
//     const tax = new Tax({
//         CompanyId: req.body.CompanyId,
//         Name: req.body.Name,
//         Percentage: req.body.Percentage,
//         Include_Tax: req.body.Include_Tax,
//         Status: req.body.Status
//     });
//     tax.save()
//     .then(result => {
//         console.log(result);
//         res.status(201).json( result );
//     })
//     .catch(error => {
//         console.log('Error: ' + error);
//         res.status(500).json({ Error: error })
//     });
// }

exports.create_tax = (req, res, next) => {
    const tax = new Tax({
        _id: new mongoose.Types.ObjectId(),
        Company_Id: req.body.Company_Id,
        Name: req.body.Name,
        Percentage: req.body.Percentage,
        Include_Tax: req.body.Include_Tax,
        Create_Date: Date.now(),
        Status: req.body.Status
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

// exports.update_tax = (async (req, res, next) => {
//     const taxId = req.params.taxId;
//     const updateOps = {};  // [ { "propName": "name", "value": "Harry Potter" }]
//     for (const [key, value] of Object.entries(req.body)){
//         updateOps[key] = value;
//     }
    
//     try {
//         const transaction = await db.transaction();
//         let tax = await Tax.update( updateOps, { where: { TaxId: taxId },  transaction });
    
//         let log = await Log.create({
//             Table_Name: 'TAXES',
//             Old_Data: 'ABC',
//             New_Data: 'CDV',
//             CompanyId: '89b3fb09-9688-4b36-b3b9-c385c7dedbb0',
//             UserId: '564d231e-f90c-4eda-8ebd-1a327d74c226'
//         }, { transaction });

//         await transaction.commit();
//         res.status(200).json( { Message: 'Transaction succesfully' });
//     }
//     catch (err)
//     {
//         if (transaction) await transaction.rollback();
//     }
// });

exports.update_tax = async (req, res, next) => {
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
         // clean models
        // await Promise.all(
        //     Object.entries(mongoose.models).map(([k,m]) => m.deleteMany())
        // )
console.log('prev sessin tran');
        const session = await mongoose.startSession();
        session.startTransaction();
console.log('post session tran');
        // Collections must exist in transactions
        await Promise.all(
            Object.entries(mongoose.models).map(([k,m]) => m.createCollection())
        );
console.log('collection tran');
        try {
            //const opts = { session };
            console.log('previo update one');
            await Tax.updateOne({ _id: taxId }, { $set: updateOps }, { session });
                                        // { $currentDate: { Modified_Date: true } })
                                    // .exec()
                                    // .then(result => {
                                    //     console.log(result);
                                    //     res.status(200).json( { message: 'Tax updated' } );
                                    // })
                                    // .catch(error => {
                                    //     console.log('Error: ' + error);
                                    //     res.status(500).json({ Error: error })
                                    // });

            let log = new Log({
                _id: new mongoose.Types.ObjectId(),
                Schema_Name: 'taxes',
                Old_Data: 'data 00',
                New_Data: 'data 01',
                Object_Id: taxId,
                Company_Id: '5db721c3d464dd0000aeb60b',
                User_Id: '5db7215a1c9d44000040c6ad',
                Status: 1
            });
            console.log(log);
            console.log('previo log creation');
            await log.save({ session });
                                    // .then(result => {
                                    //     console.log(result);
                                    //     res.status(201).json({
                                    //         taxes : { 
                                    //             _id: result._id,
                                    //             Name: result.Name
                                    //         }
                                    //     });
                                    // })
                                    // .catch(error => {
                                    //     console.log('Error: ' + error);
                                    //     res.status(500).json({ Error: error })
                                    // });
            await session.commitTransaction();
            session.endSession();
            res.status(200).json( { message: 'Tax updated' } );
        } catch (error) {
            // If an error occurred, abort the whole transaction and
            // undo any changes that might have happened
            await session.abortTransaction();
            session.endSession();
            //throw error; 
            res.status(500).json({ Error: error });
        }
}

// exports.delete_tax = (req, res, next) => {
//     const taxId = req.params.taxId;

//     Tax.update({
//         Modified_Date: db.NOW,
//         Status: 0
//       },{
//         where: {
//             TaxId: taxId
//         }
//     })
//     .then(result => {
//         console.log(result);
//         res.status(200).json( result );
//     })
//     .catch(error => {
//         console.log('Error: ' + error);
//         res.status(500).json({ Error: error })
//     });
// }

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