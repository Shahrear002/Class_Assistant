const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const randtoken = require('rand-token');

var post = require('./posts');

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

// Test route
router.get('/test', (req, res) => res.json({ msg: 'classroom works' }));

// @route POST api/classrooms/register
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

		// Check user is a teacher or not
		const Role = req.user.role;
		if (Role.toUpperCase() !== 'TEACHER') {
			return res
				.status(400)
				.json({ msg: 'You must be a teacher to create a classroom' });
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
			avatar: req.body.avatar,
			user: req.user.id
		});
		newClassroom.save().then(classroom => res.json(classroom));
	}
);

// @route POST api/classrooms/joinclass
// @description Join In Classroom by enrollmentcode
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

		// Check user is a student or not
		const Role = req.user.role;
		if (Role.toUpperCase() !== 'STUDENT') {
			return res
				.status(400)
				.json({ msg: 'You must be a student to enroll in a classroom' });
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

// @route GET api/classrooms
// @description GET all classrooms of an user
// @access Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Classroom.find()
			.then(cls => {
				var i;
				var classes = [];
				for (i = 0; i < cls.length; i++) {
					//cl = cls[i];
					//console.log(cl);
					var students = cls[i].enrolledStudents;
					//console.log(req.user.id);
					var j;
					for (j = 0; j < students.length; j++) {
						if (req.user.id.toString() === students[j].user.toString()) {
							classes.push(cls[i]);
							//	console.log(students[0].user);
						}
					}
				}
				res.json(classes);
			})
			.catch(err =>
				res
					.status(404)
					.json({ noclassfound: 'You are not enrolled in a classroom' })
			);
	}
);

// @route GET api/classrooms/:classroom_id
// @description GET classroom by classroom id
// @access Private
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Classroom.findById(req.params.id)
			.then(cls => {
				//console.log(cls);
				if (!cls) {
					res.status(404).json({ noclassfound: 'Classroom not found' });
				}

				res.json(cls);
			})
			.catch(err =>
				res.status(404).json({ noclassfound: 'Classroom not found' })
			);
	}
);

// @route GET api/classrooms/:id/enrolledstudents
// @description Showing Enrolled Students By Classroom ID
// @access Private
router.get(
	'/:id/enrolledstudents',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Classroom.findById(req.params.id)
			.then(students => {
				var userMap = [];
				var st = [];

				userMap = students.enrolledStudents.slice();

				userMap.forEach(function(student) {
					st.push(student.user);
				});

				res.send(st);
			})
			.catch(err =>
				res.status(404).json({ nostudentsfound: 'No students found' })
			);
	}
);

// @route GET api/classrooms/deleteclassroom/:classroom_id
// @description Delete a classroom
// @access Private
router.delete(
	'/deleteclassroom/:classroom_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Classroom.findOneAndRemove({ _id: req.params.classroom_id }).then(cls => {
			res.json({ success: true });
		});
	}
);

// @route post api/classroom/:classroom_id/posts
// @description Posts in Classroom
// @access Private
router
	.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {})
	.use('/:id/post', post);

module.exports = router;
