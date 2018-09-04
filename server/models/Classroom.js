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
	enrollmentCode: {
		type: String
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
			type: Schema.Types.ObjectId,
			ref: 'posts'
		}
	],
	avatar: {
		type: String
	}
});

module.exports = Classroom = mongoose.model('classroom', ClassroomSchema);
