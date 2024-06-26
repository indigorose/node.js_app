const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

// Story functionality - add stories

const Story = require('../models/Story');

// @desc    Show add page
// @route   GET /stories/add

router.get('/add', ensureAuth, (req, res, next) => {
	res.render('stories/add');
});

// @desc    Process add form
// @route   POST /stories

router.post('/stories', ensureAuth, async (req, res, next) => {
	try {
		req.body.user = req.user.id;
		await Story.create(req.body);
		res.redirect('/dashboard');
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

// @desc    Show all stories
// @route   GET /stories
router.get('/stories', ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({ status: 'public' })
			.populate('user')
			.sort({ createdAt: 'desc' })
			.lean();

		res.render('stories/index', {
			stories,
		});
	} catch (err) {
		console.error(err);
		res.render('error/500');
	}
});

// @desc    Show single story
// @route   GET /stories/:id
router.get('stories/:id', ensureAuth, async (req, res) => {
	try {
		let story = await Story.findById(req.params.id).populate('user').lean();

		if (!story) {
			return res.render('error/404');
		}

		if (story.user._id != req.user.id && story.status == 'private') {
			res.render('error/404');
		} else {
			res.render('stories/show', {
				story,
			});
		}
	} catch (err) {
		console.error(err);
		res.render('error/404');
	}
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
	try {
		const story = await Story.findOne({
			_id: req.params.id,
		}).lean();

		if (!story) {
			return res.render('error/404');
		}

		if (story.user != req.user.id) {
			res.redirect('/stories');
		} else {
			res.render('stories/edit', {
				story,
			});
		}
	} catch (err) {
		console.error(err);
		return res.render('error/500');
	}
});
module.exports = router;
