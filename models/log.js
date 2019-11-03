/*const Sequelize = require('sequelize');
const db = require('../config/database');

const Log = db.define('logs', {
    LogId: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Table_Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Old_Data: {
        type: Sequelize.STRING,
        allowNull: false
    },
    New_Data: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Create_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
        //references: { model: 'companies', key: 'Company_Id' },
        validate: {
            isUUID: 4
        }
    },
    UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4
        }
    }
})

module.exports = Log;*/

const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Schema_Name: { type: String, required: true },
    Old_Data: { type: String, required: true },
    New_Data: { type: String, required: true },
    Object_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    Company_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    User_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    Status: { type: Number, required: true },
    Create_Date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);