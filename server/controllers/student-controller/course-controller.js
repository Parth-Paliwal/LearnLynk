
const Course = require('../../models/Course')


const getAllStudentViewCourses = async(req , res)=>{
    try {
        
        const courseList = await Course.find({});
        if(courseList.length === 0){
            return res.status(404).json({
                success : false,
                message : "No course Found",
                data : []
            })
        }
        res.status(200).json({
            success : true,
            data : courseList,

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message : "some error occured"
        })
    }
}
const getStudentViewCoursesDetails = async(req , res)=>{
    try {
        
        const {id} = req.params;
        const courseDetails = await Course.find({id});

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "No course Found",
                data : null
            })
        }

        res.status(200).json({
            success : true,
            data : courseDetails,

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message : "some error occured"
        })
    }
}


module.exports  = {getAllStudentViewCourses , getStudentViewCoursesDetails}
