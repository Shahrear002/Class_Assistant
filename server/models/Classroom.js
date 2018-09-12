const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create ClassRoom Schema
const ClassroomSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	section: {
		type: String
	},
	description: {
		type: String
	},
	room: {
		type: String
	},
	ownerId: {
		type: String
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	enrollmentCode: {
		type: String,
		required: true
	},
	creationTime: {
		type: Date,
		default: Date.now
	},
	enrolledStudents: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users'
			}
		}
	],
	posts: [
		{
			post: {
				type: Schema.Types.ObjectId,
				ref: 'posts'
			}
		}
	],
	avatar: {
		type: String
	}
});

module.exports = Classroom = mongoose.model('classroom', ClassroomSchema);
