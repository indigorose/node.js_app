const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

// Story functionality - add stories

const Story = require('../models/Story');

// @desc    Show add page
// @route   GET /stories/add

router.get('/add', ensureAuth, (req, res, next) => {
	res.render('../views/stories/add');
});

module.exports = router;
