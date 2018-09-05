const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const randtoken = require('rand-token');

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
const validateJoinclassInput = require('../../validation/classcode');

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

		// Enrollment Code generate
		const classcode = randtoken.generate(6);
		//console.log(token);

		const newClassroom = new Classroom({
			name: req.body.name,
			section: req.body.section,
			description: req.body.description,
			room: req.body.room,
			ownerId: req.user.id,
			enrollmentCode: classcode,
			avatar: req.body.avatar
		});
		newClassroom.save().then(classroom => res.json(classroom));
	}
);

// @route POST api/classroom/joinclass
// @description Join In Classroom
// @access Private
router.post(
	'/joinclass',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateJoinclassInput(req.body);

		// Check Validation
		if (!isValid) {
			return res.status(400).json(errors);
		}

		const classcode = req.body.enrollmentCode;

		// Find Classroom By EnrollmentCode
		Classroom.findOne({ enrollmentCode: classcode }).then(classroom => {
			if (!classroom) {
				errors.classroom = 'Classroom not found';
				return res.status(404).json(errors);
			}

			// Add students id to enrolledStudents array
			classroom.enrolledStudents.unshift({ user: req.user.id });

			classroom.save().then(classroom => res.json(classroom));
		});
	}
);

// @route GET api/classroom/join
// @description Showing Enrolled Students
// @access Private
router.get(
	'/enrolledstudents/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Classroom.findById(req.params.id).then(students => {
			var userMap = [];
			var st = [];

			userMap = students.enrolledStudents;
			userMap.forEach(function(student) {
				st.push(student.user);
			});

			res.send(st);
		});
	}
);

module.exports = router;
