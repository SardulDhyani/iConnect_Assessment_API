const { Router } = require('express');

const router = Router();

const iconValidators = require('../middlewares/validators/iCon.form.validator');
const controllers = require('../controllers/iCon.controller');

// GET
router.get('/', controllers.getIndex);
router.get('/companies', controllers.getCompanies);
router.get('/company/:companyID', controllers.getCompanyByID);
router.get('/company/search-name/:companyName', controllers.getSearchName);

// PUT
router.put(
  '/edit-company',
  iconValidators.validate('editCompany'),
  controllers.putEditCompany
);

// POST
router.post(
  '/create-company',
  iconValidators.validate('addCompany'),
  controllers.postAddCompany
);

module.exports = router;
