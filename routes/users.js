var express = require('express')
var sql = require("mssql")
var jwt = require('jsonwebtoken')
var fs = require('fs')
var router = express.Router()

const config = require('../config/config')
const dbConn = config.sqlConn
const pool = new sql.ConnectionPool(dbConn)
const PRIVATE_KEY = fs.readFileSync('./keys/private.key')

//const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key')

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
  (async function () {
    await pool;
    try {
        //let pool = await sql.connect(dbConn)
        await pool.request()
            .input('name', sql.VarChar, req.body.NAME)
            .query('select * from TYPES WHERE NAME = @name')
            .then(result => {
              res.send(result)
            })
        //console.dir(result)
        sql.close()
    } catch (err) {
      console.log(err);
      res.status(404).send('Not found');
        // ... error checks
    }
  })()
});

router.post('/login', function(req, res, next){
  (async function() {
    await pool;
    try{
      const { email, password } = req.body
      const user =  { userName: 'esantizo', email: email, password: password, isAdmin : 1, companyId: 'fa123', storeId: 'fg345', status: 1 }  //await User.findByCredentials(email, password)
      if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = jwt.sign({userName: user.userName}, PRIVATE_KEY)
      /*
      , {
        algorithm: 'RS256',
        expiresIn: '10h',
        subject: 'esantizo'
      }
      */
      console.log('user: ' + user)
      res.send({ user, token })
      sql.close()
    } catch (err) {
      console.log(err);
      res.status(400).send(error)
        // ... error checks
    }
  })()
});

module.exports = router;
