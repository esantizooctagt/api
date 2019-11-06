const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');
const User = db.define('users', {
    UserId: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    UserName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Is_Admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Status: {
        type: Sequelize.ENUM(0, 1, 2),
        allowNull: false,
        defaultValue: 1
    },
    CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4
        }
    },
    Create_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    Modified_Date: {
        type: Sequelize.DATE
    }
// }, {
//     instanceMethods: {
//         generateHash(password) {
//             return bcrypt.hash(password, bcrypt.genSaltSync(8));
//         },
//         validPassword(password) {
//             return bcrypt.compare(password, this.Password);
//         }
//     }
})
module.exports = User;

// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId,  required: true },
//     Email: { 
//         type: String, 
//         required: true, 
//         unique: true, 
//         match: /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/ },
//     User_Name: { type: String, required: true, unique: true },
//     Password: { type: String, required: true },
//     Is_Admin: { type: Number, required: true, Default: 1 },
//     Status: { type: Number, required: true, Default: 1 },
//     Company_Id: { type: mongoose.Schema.Types.ObjectId,  required: true },
//     Create_Date: { type: Date, required: true, Default: Date.Now },
//     Modified_Date: { type: Date, required: false }
// });

// module.exports = mongoose.model('User', userSchema);