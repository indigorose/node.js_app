const express = require('express');
const router = express.Router();

// @desc    Login/Landing Page
// @route   GET

router.get('/', (req, res, next) => {
	res.render('main');
});

// @desc    Dashboard
// @route   GET /dashboard

router.get('/', (req, res, next) => {
	res.render('login');
});

module.exports = router;
