

const StudentCourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses")


const markCurrentLectureAsViewed = async(req , res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured at markCurrentLectureAsViewed"
        })
    }
}

const getCurrentCourseProgress = async(req , res)=>{
    try {
        
        const {userId , courseId} = req.params();
        const studentPurchasedCourses = await StudentCourses.findOne({userId});
        const isCurrentCoursePurchasedByUser = studentPurchasedCourses?.courses?.findIndex(item => item.courseId === courseId) === -1;
        if(isCurrentCoursePurchasedByUser){
            return res.status(200).json({
                success : false,
                isPurchased : false,
                message : "purchase not done"
            })
        }

        const currentUserCourseProgress = await StudentCourseProgress.findOne({userId , courseId}).populate('courseId')

        if(currentUserCourseProgress?.lecturesProgress?.length === 0){
            const course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    success : false,
                    message : "course not found"
                })
            }

            return res.status(200).json({
                success : true,
                message : "no progress found",
                data : {
                    courseDetails : course,
                    progress : [],
                    isPurchased : true
                }
            })

        }

        if(currentUserCourseProgress){
            res.status(200).json({
                success : true,
                data : {
                    courseDetails : currentUserCourseProgress.courseId,
                    progress : currentUserCourseProgress.lecturesProgress,
                    completed : currentUserCourseProgress.completed,
                    completionDate : currentUserCourseProgress.completionDate,
                    isPurchased : true,
                    courseProgress : currentUserCourseProgress
                }
            })
        }



        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured at getCurrntCourseProgress"
        })
    }
}

const resetCurrentCourseProgress = async(req , res)=>{
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured at resetCurrentCourseProgress"
        })
    }
}

module.exports = {getCurrentCourseProgress , markCurrentLectureAsViewed , resetCurrentCourseProgress}