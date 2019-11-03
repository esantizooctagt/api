const express = require('express');
const router = express.Router();

const PackagesController = require('../controllers/packages');

router.get('/', PackagesController.packages_get_all);

module.exports = router;
  