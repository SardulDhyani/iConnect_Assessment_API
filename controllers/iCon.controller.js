const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const iConModel = require('../models/iCon.model');

exports.getIndex = (req, res) => {
  return res.status(200).send({ message: 'Index Route' });
};

exports.getCompanies = async (req, res) => {
  try {
    const companiesList = await iConModel.find();
    if (companiesList)
      return res.status(200).send({
        companiesList,
      });
    throw new Error('Server Error');
  } catch (errors) {
    return res.status(422).send({ errors });
  }
};

exports.getCompanyByID = async (req, res) => {
  try {
    const companyID = req.params.companyID;
    const company = await iConModel.findOne({
      _id: mongoose.mongo.ObjectId(companyID),
    });
    return res.status(200).send(company);
  } catch (errors) {
    console.log(errors);
    return res.status(422).send({ errors });
  }
};

exports.getSearchName = async (req, res) => {
  try {
    const companyName = req.params.companyName;
    console.log(req.params);
    if (companyName === 'null') {
      const company = await iConModel.find();
      return res.status(200).send(company);
    }
    const company = await iConModel.find({
      companyName,
    });
    return res.status(200).send(company);
  } catch (errors) {
    console.log(errors);
    return res.status(422).send({ errors });
  }
};

// PUT
exports.putEditCompany = async (req, res) => {
  try {
    const {
      _id,
      companyName,
      companyDescription,
      contactNumber,
      contactEmail,
      state,
      logoLink,
      city,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = [];
      errors.array().forEach((err) => {
        validationErrors.push(err.msg);
      });
      return res.send({ errors: validationErrors });
    }
    req.body;
    var newLink = logoLink;
    if (req.file) newLink = req.file.path.replace(/\\/g, '/');
    const existingCompany = await iConModel.findOne({
      _id: mongoose.mongo.ObjectId(_id),
    });
    if (existingCompany) {
      existingCompany.companyName = companyName;
      existingCompany.companyDescription = companyDescription;
      existingCompany.contactNumber = contactNumber;
      existingCompany.contactEmail = contactEmail;
      existingCompany.state = state;
      existingCompany.logoLink = newLink;
      existingCompany.city = city;

      const savedCompany = await existingCompany.save();
      return res.status(200).send({ company: savedCompany });
    }
    throw new Error('Server Error');
  } catch (errors) {
    console.log(errors);
    return res.status(422).send({ errors });
  }
};

// POST
exports.postAddCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationErrors = [];
      errors.array().forEach((err) => {
        validationErrors.push(err.msg);
      });
      return res.send({ errors: validationErrors });
    }
    const logoLink = req.file.path.replace(/\\/g, '/');

    const newCom = {
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      contactNumber: req.body.contactNumber,
      contactEmail: req.body.contactEmail,
      state: req.body.state,
      logoLink,
      city: req.body.city,
    };

    const newCompany = new iConModel(newCom);
    const savedCompany = await newCompany.save();
    console.log(savedCompany);
    return res.status(200).send({
      company: savedCompany,
    });
  } catch (errors) {
    console.log(errors);
    return res.status(422).send({ errors });
  }
};
