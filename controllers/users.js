const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const mongoose = require('mongoose');

exports.users_login = (req, res, next) => {
    const { userName, password } = req.body;

    User.findOne({ where: { UserName: userName }})
        .then(data => {
            if (data != null) {
                bcrypt.compare(password, data.Password, (err, result) => {
                    if (err){
                        return res.status(401).json({ Message: 'Auth failed' });
                    }
                    if (result){
                        const user = 
                        {
                            User_Id: data.UserId,
                            User_Name: data.UserName,
                            Email: data.Email,
                            Is_Admin: data.Is_Admin,
                            Company_Id: data.CompanyId
                        }
                        const token = jwt.sign(
                        {
                            Email: data.Email, 
                            User_Id: data._id
                        }, 
                            process.env.JWT_KEY, 
                            {
                                expiresIn: "10h"
                            });

                        res.status(200).send( { user, token } );
                    }
                }); 
            } else {
                return res.status(401).json({ Message:  'Auth failed' });
            }
        })
        .catch(error => {
            console.log('Error: ' + error);
            res.status(500).json({ Error: error })
        });
}

// exports.create_user = (req, res, next) => {
//     const { userName, email, password, isAdmin, companyId } = req.body;
//     User.find({ Email: email })
//         .exec()
//         .then(user => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     Message: 'Mail exists'
//                 });
//             } else {
//                 bcrypt.hash(password, 10, (err, hash) => {
//                     if (err){
//                         return res.status(500).json({ Error:  err });
//                     } else {
//                         const user = new User ({
//                             _id: new mongoose.Types.ObjectId(),
//                             User_Name : userName,
//                             Password: hash,
//                             Is_Admin: isAdmin,
//                             Status: 0,
//                             Company_Id: companyId
//                         });
//                         user
//                             .Save()
//                             .then(result => {
//                                 res.status(201).json({ Message: 'User created' });
//                             })
//                             .catch(err => {
//                                 console.log('Error: ' + error);
//                                 res.status(500).json({ Error: error })
//                             });
//                     }
//                 });
//             }
//         })
// }

// exports.delete_user = (req, res, next) => {
//     User.remove({_id: req.params.userId})
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 Message: 'User deleted'
//             })
//         })
//         .catch(err => {
//             console.log('Error: ' + error);
//             res.status(500).json({ Error: error })
//         });
// }