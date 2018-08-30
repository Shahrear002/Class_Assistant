const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create ClassRoom Schema
const ClassRoomSchema = ({
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
        type: Schema.Types.ObjectEmail,
        ref: 'users'
      }
    }
  ],
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }
});

module.exports = ClassRoom = mongoose.model('ClassRoom', ClassRoomSchema);
