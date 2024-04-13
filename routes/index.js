const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
// @desc    Login/Landing Page
// @route   GET

router.get('/', ensureGuest, (req, res, next) => {
	res.render('../views/login2', { layout: 'login' });
});

// @desc    Dashboard
// @route   GET /dashboard

router.get('/dashboard', ensureAuth, (req, res, next) => {
	res.render('../views/dashboard', {
		name: req.user.firstName,
	});
});

module.exports = router;
