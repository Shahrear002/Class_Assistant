const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create ClassRoom Schema
const ClassroomSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
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
    type: String,
    required: true
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
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Classroom = mongoose.model('classroom', ClassroomSchema);
