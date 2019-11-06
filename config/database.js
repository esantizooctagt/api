const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.SQL_DB, process.env.SQL_USR, process.env.SQL_PWD, {
    host: process.env.SQL_HOST,
    dialect: 'mssql',
    pool : 
      { 
        max : 10, 
        min : 0, 
        idleTimeoutMillis : 30000 
      },
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
      }
});

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};