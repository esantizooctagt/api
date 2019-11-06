const express = require('express');
const app = express();

//const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const db = require('./config/database');
// const mongoose = require('mongoose');


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//const cashiersRouter = require('./routes/cashiers');
//const companiesRouter = require('./routes/companies');
//const customersRouter = require('./routes/customers');
//const documentsRouter = require('./routes/documents');
//const invoicesRouter = require('./routes/invoices');
//const productsRouter = require('./routes/products');
//const storesRouter = require('./routes/stores');
//const subscriptionsRouter = require('./routes/subscriptions');
const taxesRouter = require('./routes/taxes');
const usersRouter = require('./routes/users');
const packagesRouter = require('./routes/packages')

const frontURL = process.env.frontURL;
// setTimeout(function() {
//   mongoose.connect(
//     "mongodb+srv://" + process.env.MONG_USR + ":" + process.env.MONG_PWD + "@clusoctagt-u7ryt.mongodb.net/OCTAGT?retryWrites=true&w=majority",
//       { 
//         useUnifiedTopology: true,
//         useNewUrlParser: true  ,
//         autoIndex: false  
//       }
//     );
// }, 30000);
// mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", frontURL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

/*app.use('/cashiers', cashiersRouter);
app.use('/companies', companiesRouter);
app.use('/customers', customersRouter);
app.use('/documents', documentsRouter);
app.use('/invoices', invoicesRouter);
app.use('/products', productsRouter);
app.use('/stores', storesRouter);
app.use('/subscriptions', subscriptionsRouter);*/
app.use('/packages', packagesRouter)
app.use('/taxes', taxesRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  })
});

module.exports = app;
