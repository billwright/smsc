const primeFactors = require('../modules/primeFactors');
const express = require('express');
const primeFactorsRouter = express.Router();

// NOTE: this is NOT '/primeFactors'. That will be defined where
// this router is used.
primeFactorsRouter.get('/', (req, res) => {
    res.render('pages/primeFactors');
});

primeFactorsRouter.get('/api', (req, res) => {
    const input = req.query.input;
    const factors = primeFactors(input);
    console.log('prime factors of ', input, 'are', factors);
    res.status(200).json({ input, factors });
});

module.exports = primeFactorsRouter;