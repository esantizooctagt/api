/*const Sequelize = require('sequelize');
const db = require('../config/database');

const Tax = db.define('taxes', {
    TaxId: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    CompanyId: {
        type: Sequelize.UUID,
        allowNull: false,
        validate: {
            isUUID: 4
        }
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Percentage: {
        type: Sequelize.DECIMAL(18,2),
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    Include_Tax: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    Status: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    Create_Date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    Modified_Date: {
        type: Sequelize.DATE
    }
})

module.exports = Tax; */

const mongoose = require('mongoose');

const taxSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId,  required: true },
    Name: { type: String, required: true },
    Percentage: { type: Number, required: true },
    Include_Tax: { type: Boolean, required: true },
    Status: { type: Number, required: true, Default: 1 },
    Company_Id: { type: mongoose.Schema.Types.ObjectId,  required: true },
    Create_Date: { type: Date, required: true, Default: Date.Now },
    Modified_Date: { type: Date, required: false }
});

taxSchema.pre('updateOne', function () {
    this.set({ Modified_Date: new Date() });
    //next();
});

// taxSchema.pre('save', function preSave(next) {
//     this.set({ Create_Date: new Date() });
//     next();
// });

module.exports = mongoose.model('Tax', taxSchema);