var express = require('express');
var sql = require("mssql");
var router = express.Router();

const config = require('../config/config');
const dbConn = config.sqlConn;

const pool = new sql.ConnectionPool(dbConn)

pool.connect(err => {
  console.log(err);
  //res.status(404).send('Not found');
})

var myLogger = function (req, res, next) {
  console.log('req: ' + req);
  console.log('LOGGED');
  next();
};

router.use(myLogger);

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('body: ' + 'Erick' + req.body.NAME);
  (async function () {
    await pool;
    try {
        //let pool = await sql.connect(dbConn)
        await pool.request()
            .input('name', sql.VarChar, req.body.NAME)
            .query('select * from TYPES WHERE NAME = @name')
            .then(result => {
              res.send(result);
            })
        //console.dir(result)
        sql.close();
    } catch (err) {
      console.log(err);
      res.status(404).send('Not found');
        // ... error checks
    }
  })()
});

module.exports = router;
