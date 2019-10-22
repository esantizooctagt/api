const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const TaxesController = require('../controllers/taxes');

router.get('/', TaxesController.taxes_get_all);

router.get('/:taxId', checkAuth, TaxesController.tax_get_one);

router.post('/', checkAuth, TaxesController.create_tax);

router.patch('/', checkAuth, TaxesController.update_tax);

router.delete('/:taxId', checkAuth, TaxesController.delete_tax);

module.exports = router;
  