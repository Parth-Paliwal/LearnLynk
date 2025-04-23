

const StudentCourseProgress = require("../../models/CourseProgress");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");
const CourseProgress = require("../../models/CourseProgress");


const markCurrentLectureAsViewed = async(req , res)=>{
    try {
        
        const {userId , courseId , lectureId} = req.body;
        let progress = await CourseProgress.findOne({userId , courseId });

        if(!progress){
            progress = new CourseProgress({
                userId,
                courseId,
                lecturesProgress : [
                    {
                        lectureId,
                        viewed : true,
                        dateViewed : new Date(),
                    }
                ]
            })
            await progress.save();
        }else {
             const lectureProgress = progress.lecturesProgress.find(item=>item.lectureId === lectureId);
             if(lectureProgress){
                lectureProgress.viewed = true
                lectureProgress.dateViewed = new Date()

             }else{
                progress.lecturesProgress.push({
                    lectureId ,
                    viewed : true,
                    dateViewed : new Date(),
                })
             }
                await progress.save();

        }

        const course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({
                success : false,
                message : 'Course not found'
            })
        }
        
        const allLecturesViewed  = progress.lecturesProgress.length === course.curriculum.length && progress.lecturesProgress.every(item=>item.viewed);

        if(allLecturesViewed){
            progress.completed = true
            progress.completionDate = new Date()
            await progress.save()
        }

        res.status(200).json({
            success : true,
            message : 'Lecture marked as viewed',
            data : progress
        })
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
        
        const {userId , courseId} = req.params;
        const studentPurchasedCourses = await StudentCourses.findOne({userId});
        const isCurrentCoursePurchasedByUser = studentPurchasedCourses?.courses?.findIndex(item => item.courseId === courseId) === -1;
        if(isCurrentCoursePurchasedByUser){
            return res.status(200).json({
                success : true,
                data : {
                    isPurchased : false,
                },
                message : "purchase not done"
            })
        }

        const currentUserCourseProgress = await StudentCourseProgress.findOne({userId , courseId})

        if(!currentUserCourseProgress ||  currentUserCourseProgress?.lecturesProgress?.length === 0){
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
                    isPurchased : true, 
                }
            })

        }

        const courseDetails = await Course.findById(courseId);

        if(currentUserCourseProgress){
            res.status(200).json({
                success : true,
                data : {
                    courseDetails,
                    progress : currentUserCourseProgress.lecturesProgress,
                    completed : currentUserCourseProgress.completed,
                    completionDate : currentUserCourseProgress.completionDate,
                    isPurchased : true,
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
        
        const {userId , courseId} = req.body;

        const progress = await CourseProgress.findOne({userId , courseId});

        if(!progress){
            return res.status(200).josn({
                success : false,
                message : "course not found"
            })
        }

        progress.lecturesProgress = []
        progress.completed = false;
        progress.completionDate = null
        await progress.save();

        res.status(200).json({
            success : true,
            message : "course Progress has been reset",
            data : progress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "some error occured at resetCurrentCourseProgress"
        })
    }
}

module.exports = {getCurrentCourseProgress , markCurrentLectureAsViewed , resetCurrentCourseProgress}