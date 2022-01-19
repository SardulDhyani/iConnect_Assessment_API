const { body } = require('express-validator');
const iConModel = require('../../models/iCon.model');

exports.validate = (method) => {
  switch (method) {
    case 'addCompany': {
      return [
        body('companyName')
          .trim()
          .not()
          .isEmpty()
          .custom((value, { req }) => {
            return iConModel.findOne({ companyName: value }).then((iconDoc) => {
              if (iconDoc) throw new Error('Company Name Already Exists');
            });
          }),
        body('companyDescription')
          .trim()
          .not()
          .isEmpty()
          .withMessage('Please Enter Company Description'),
        body('contactNumber')
          .trim()
          .not()
          .isEmpty()
          .withMessage('Please Enter Contact Number'),
        body('contactEmail')
          .not()
          .isEmpty()
          .isEmail()
          .withMessage('Please Enter a valid e-mail')
          .custom((value, { req }) => {
            return iConModel
              .findOne({ contactEmail: value })
              .then((iconDoc) => {
                if (iconDoc) throw new Error('Email already exist');
              });
          }),
        body('state').trim().not().isEmpty().withMessage('Please Enter State'),
        body('city').trim().not().isEmpty().withMessage('Please Enter City'),
      ];
    }
    case 'editCompany': {
      return [
        body('companyName').trim().not().isEmpty(),
        body('companyDescription')
          .trim()
          .not()
          .isEmpty()
          .withMessage('Please Enter Company Description'),
        body('contactNumber')
          .trim()
          .not()
          .isEmpty()
          .withMessage('Please Enter Contact Number'),
        body('contactEmail')
          .not()
          .isEmpty()
          .isEmail()
          .withMessage('Please Enter a valid e-mail'),
        body('state').trim().not().isEmpty().withMessage('Please Enter State'),
        body('city').trim().not().isEmpty().withMessage('Please Enter City'),
      ];
    }
  }
};
