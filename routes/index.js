const express = require('express');
const router = express.Router();

// @desc    Login/Landing Page
// @route   GET

router.get('/', (req, res, next) => {
	res.render('login');
});

// @desc    Dashboard
// @route   GET /dashboard

router.get('/dashboard', (req, res, next) => {
	res.render('../views/dashboard');
});

module.exports = router;
