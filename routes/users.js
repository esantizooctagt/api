const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const UserController = require('../controllers/users');

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


router.post('/login', UserController.users_login);

router.post('/signup', UserController.create_user);

router.delete('/:userId', UserController.delete_user);

module.exports = router;
