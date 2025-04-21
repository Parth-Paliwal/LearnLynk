const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema({
    lectureId : String,
    viewed :  Boolean,
    dateViewed : Date,

})

const StudentCourseProgressSchema = new mongoose.Schema({

    userId : String,
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      }, 
    completed : Boolean,
    completionDate : Date,
    lecturesProgress : [LectureProgressSchema] 

})

module.exports = mongoose.model("StudentCourseProgress" , StudentCourseProgressSchema)