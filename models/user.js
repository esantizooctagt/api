const Sequelize = require('sequelize');
const db = require('../config/database');
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
}, { hasTrigger: true })
module.exports = User;