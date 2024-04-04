const express = require('express');
const router = express.Router();

// @desc    Login/Landing Page
// @route   GET

router.get('/', (res, req) => {
	res.send('Login');
});

// @desc    Dashboard
// @route   GET /dashboard

router.get('/dashboard', (res, req) => {
	res.send('Dashboard');
});

module.exports = router;
