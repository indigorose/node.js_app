const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Story functionality

const Story = require('../models/Story');

// @desc    Login/Landing Page
// @route   GET

router.get('/', ensureGuest, (req, res, next) => {
	res.render('../views/login2', { layout: 'login' });
});

// @desc    Dashboard
// @route   GET /dashboard

router.get('/dashboard', ensureAuth, async (req, res, next) => {
	try {
		const stories = await Story.find({ user: req.user.id }).lean();
		res.render('../views/dashboard', {
			name: req.user.firstName,
			stories,
		});
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

module.exports = router;
