const Tax = require('../models/tax');
const Log = require('../models/log');
const db = require('../config/database');
const uuidv4 = require('uuid/v4');

const mongoose = require('mongoose');
const diffHistory = require('mongoose-diff-history/diffHistory');

exports.taxes_get_all = (req, res, next) => {
    const perPage = 1
    const page = req.params.page || 1
    const skip = (perPage*page)-1;
    const companyId = req.params.companyId;

    Tax.findAndCountAll({ where: { CompanyId: companyId }, offset: skip, limit: perPage })
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

// exports.taxes_get_all = (req, res, next) => {
//     const perPage = 1
//     const page = req.params.page || 1

//     const companyId = req.params.companyId;
//     Tax.find({ Company_Id: companyId })
//         .skip( perPage*(page-1) )
//         .limit( perPage )
//         .exec(function (err, taxesData) {
//             const taxes = 
//                 taxesData.map(tax => {
//                     return {
//                         Tax_Id: tax._id,
//                         Company_Id: tax.Company_Id,
//                         Name: tax.Name,
//                         Percentage: tax.Percentage,
//                         Include_Tax: tax.Include_Tax,
//                         Status: tax.Status
//                         //URL: 'http://localhost:3000/taxes/' + tax._id
//                     }
//                 })
//         Tax.countDocuments().exec(function (err, count) {
//                 const pagesTotal = {
//                     page: page, //(page === 0 ? 1 : page),
//                     pages: Math.ceil(count / perPage),
//                     count: count
//                 }
//                 res.status(200).send( { pagesTotal, taxes } );
//             });
//         });

//         // .exec()
//         // .then(taxes => {
//         //     const response = 
//         //         taxes.map(tax => {
//         //             return {
//         //                 Tax_Id: tax._id,
//         //                 Company_Id: tax.Company_Id,
//         //                 Name: tax.Name,
//         //                 Percentage: tax.Percentage,
//         //                 Include_Tax: tax.Include_Tax,
//         //                 Status: tax.Status
//         //                 //URL: 'http://localhost:3000/taxes/' + tax._id
//         //             }
//         //         })

//         //     res.status(200).send( response );
//         // })
//         // .catch(error => {
//         //     console.log('Error: ' + error);
//         //     res.status(500).json({ Error: error })
//         // });
// }

exports.tax_get_one = (req, res, next) => {
    const taxId = req.params.taxId;

    Tax.findByPk(taxId)
        .select('Taxid CompanyId Name Percentage Include_Tax Status')
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

// exports.create_tax = (req, res, next) => {
//     const tax = new Tax({
//         _id: new mongoose.Types.ObjectId(),
//         Company_Id: req.body.Company_Id,
//         Name: req.body.Name,
//         Percentage: req.body.Percentage,
//         Include_Tax: req.body.Include_Tax,
//         Create_Date: Date.now(),
//         Status: req.body.Status
//     });
//     tax
//         .save()
//         .then(result => {
//             console.log(result);
//             res.status(201).json({
//                 taxes : { 
//                     _id: result._id,
//                     Name: result.Name
//                 }
//             });
//         })
//         .catch(error => {
//             console.log('Error: ' + error);
//             res.status(500).json({ Error: error })
//         });
// }

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
    // const taxId = req.params.taxId;

    // Tax.findByPk(taxId)
    //     .then(result => {
    //         if (result != null) {
    //             Tax.update({ Status = 2 }, { where: { Tax_Id: taxId } });
        
    //             let log = new Log({
    //                 _id: new mongoose.Types.ObjectId(),
    //                 Schema_Name: 'taxes',
    //                 Old_Data: 'data 00',
    //                 New_Data: Tax.json,
    //                 Object_Id: taxId,
    //                 Company_Id: '5db721c3d464dd0000aeb60b',
    //                 User_Id: '5db7215a1c9d44000040c6ad',
    //                 Status: 1
    //             });
    //             log.save();
    //         } else {
    //             Tax.destroy({ where: { Tax_Id: taxId } })
    //                 .then(result => {
    //                     console.log(result);
    //                     res.status(200).json( { message: 'Tax deleted' } );
    //                 })
    //                 .catch(error => {
    //                     console.log('Error: ' + error);
    //                     res.status(500).json({ Error: error })
    //                 });
    //         }
    //     })
    //     .catch(error => {
    //         console.log('Error: ' + error);
    //         res.status(500).json({ Error: error })
    //     });
}

// exports.delete_tax = (req, res, next) => {
    // const taxId = req.params.taxId;

    // Tax.findOne({_id: taxId})
    //     .exec()
    //     .then(result => {
    //         if (result != null) {
    //             // console.log(result);
    //             const session = await mongoose.startSession();
    //             session.startTransaction();
    //             await Promise.all(
    //                 Object.entries(mongoose.models).map(([k,m]) => m.createCollection())
    //             );
    //             try {
    //                 await Tax.updateOne({ _id: taxId }, { $set: {Status = 2} }, { session });
        
    //                 let log = new Log({
    //                     _id: new mongoose.Types.ObjectId(),
    //                     Schema_Name: 'taxes',
    //                     Old_Data: 'data 00',
    //                     New_Data: Tax.json,
    //                     Object_Id: taxId,
    //                     Company_Id: '5db721c3d464dd0000aeb60b',
    //                     User_Id: '5db7215a1c9d44000040c6ad',
    //                     Status: 1
    //                 });
    //                 await log.save({ session });
    //                 await session.commitTransaction();
    //                 session.endSession();
    //                 res.status(200).json( { message: 'Tax deleted' } );
    //             } catch (error) {
    //                 // If an error occurred, abort the whole transaction and
    //                 // undo any changes that might have happened
    //                 await session.abortTransaction();
    //                 session.endSession();
    //                 //throw error; 
    //                 res.status(500).json({ Error: error });
    //             }

    //         } else {
    //             await Tax.deleteOne({ _id: taxId })
    //                 .exec()
    //                 .then(result => {
    //                     console.log(result);
    //                     res.status(200).json( { message: 'Tax deleted' } );
    //                 })
    //                 .catch(error => {
    //                     console.log('Error: ' + error);
    //                     res.status(500).json({ Error: error })
    //                 });
    //         }
    //     })
    //     .catch(error => {
    //         console.log('Error: ' + error);
    //         res.status(500).json({ Error: error })
    //     });
//}

/* Name: req.params.Name,
            Percentage: req.params.Percentage,
            Include_Tax: req.para.Include_Tax,
            Modified_Date: db.NOW,
            Status: req.params.Status
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
                    New_Data: Tax,
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
*/