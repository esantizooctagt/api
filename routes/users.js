const express = require('express');
//const sql = require("mssql");
const jwt = require('jsonwebtoken');
//const checkAuth = require('../middleware/check-auth');
const router = express.Router();

//const dbConn = process.env.sqlConn;
//const pool = new sql.ConnectionPool(dbConn);

//pool.connect(err => {
  //console.log(err);
  //res.status(404).send('Not found');
//})

const myLogger = function (req, res, next) {
//  //console.log('req: ' + req);
  console.log('LOGGED');
  next();
};

router.use(myLogger);

/* GET users listing. */
router.get('/', function(req, res, next) {
  /*(async function () {
    //await pool;
    try {
       //let pool = await sql.connect(dbConn)
        await pool.request()
            .input('name', sql.VarChar, req.body.NAME)
            .query('select * from TYPES WHERE NAME = @name')
            .then(result => {
              res.send(result)
            })
        //console.dir(result)
        const { NAME } = req.body
        const user =  { userName: 'esantizo', email: 'email@email.com', password: 'password12345$', isAdmin : 1, companyId: 'fa123', storeId: 'fg345', status: 1 }  //await User.findByCredentials(email, password)
        if (!user) {
          return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        res.send(user)
        //sql.close()
    } catch (err) {
      console.log(err);
      res.status(404).send('Not found');
        // ... error checks
    }
  })()*/
});
//checkAuth
router.post('/login', function(req, res, next){
  (async function() {
    //await pool;
    try{
      const { email, password } = req.body
      const user =  { userId: 'fagb1234', userName: 'esantizo', email: email, password: password, isAdmin : 1, companyId: 'fa123', storeId: 'fg345', status: 1 }  //await User.findByCredentials(email, password)
      if (!user) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = jwt.sign(
        {
          email: user.email, 
          userId: user.userId
        }, 
        process.env.JWT_KEY, 
        {
          expiresIn: "10h"
        }
      );
      
      res.send({ user, token })
      //sql.close()
    } catch (err) {
      console.log(err);
      res.status(400).send(error)
        // ... error checks
    }
  })()
});

module.exports = router;
