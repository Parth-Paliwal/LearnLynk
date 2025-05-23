const StudentCourses = require("../../models/StudentCourses");
const studentCouses = require("../../models/StudentCourses");

const getCoursesByStudentId = async(req , res)=>{
    try {
        const {studentId} = req.params;
        const studentBroughtCourses = await StudentCourses.findOne({
            userId : studentId
        })
        
        res.status(200).json({
            success : true,
            data : studentBroughtCourses?.courses
        })

    } catch (error) {
        console.log(error );
        res.status(500).json({
            success : false,
            message :  'some error occured'
        })
    }
}

module.exports = {getCoursesByStudentId}