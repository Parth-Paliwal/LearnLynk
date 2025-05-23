
const Course = require("../../models/Course");

const addNewCourse = async(req , res)=>{
     try {
        
        const courseData = req.body;
        const newlyCreatedCourse = new Course(courseData);
        const saveCourse = await newlyCreatedCourse.save();

        if(saveCourse){
            res.status(201).json({
                success : true,
                message : "Course Saved Successfully",
                data : saveCourse
            })
        }

       

     } catch (error) {
            console.log(error);
            res.status(500).json({
                success : false,
                message : "Some error occured"
            })
     }
}


const getAllCourses = async(req , res)=>{
     try {
        
        const coursesList =  await Course.find({});

        res.status(200).json({
            success : true,
            data : coursesList
        })

     } catch (error) {
            console.log(error);
            res.status(500).json({
                success : false,
                message : "Some error occured"
            })
     }
}
const getCourseDetailsByID = async(req , res)=>{
     try {
        
        const {id} = req.params;
        const courseDetails = await Course.findById(id);

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "course not found"
            })
        }

        res.status(201).json({
            success : true,
            data : courseDetails
        })

     } catch (error) {
            console.log(error);
            res.status(500).json({
                success : false,
                message : "Some error occured"
            })
     }
}
const updateCourseByID = async(req , res)=>{
     try {
        
        const  {id} = req.params;
        const updatedCourseData = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(id , updatedCourseData , {new : true});

        if(!updatedCourse){
            return res.status(404).json({
                success : false,
                message : "course not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "Course Updated Successfully",
            data : updatedCourse
        })

     } catch (error) {
            console.log(error);
            res.status(500).json({
                success : false,
                message : "Some error occured"
            })
     }
}

module.exports = {addNewCourse , getAllCourses , updateCourseByID , getCourseDetailsByID}