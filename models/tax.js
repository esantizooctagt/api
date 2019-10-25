const Sequelize = require('sequelize');
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

module.exports = Tax; 