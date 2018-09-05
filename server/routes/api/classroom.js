const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Classroom Model
const Classroom = require('../../models/Classroom');
// Post Model
const Post = require('../../models/Post');
// Profile Model
const Profile = require('../../models/Profile');
// Load User model
const User = require('../../models/User');

// Validation
const validateClassroomInput = require('../../validation/classroom');

router.get('/test', (req, res) => res.json({ msg: 'classroom works' }));

// @route POST api/classroom/register
// @description create Classroom
// @access Private
router.post(
	'/createclass',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateClassroomInput(req.body);

		// Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newClassroom = new Classroom({
			name: req.body.name,
			section: req.body.section,
			description: req.body.description,
			room: req.body.room,
			ownerId: req.user.id,
			avatar: req.body.avatar
		});
		newClassroom.save().then(classroom => res.json(classroom));
	}
);

// @route GET api/classroom/join
// @description Join In Classroom
// @access Private
/*router.get(
	'/joinclass',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {}
);*/

module.exports = router;
