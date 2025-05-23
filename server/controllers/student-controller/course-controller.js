
const Course = require('../../models/Course')
const StudentCourses = require('../../models/StudentCourses');


const getAllStudentViewCourses = async(req , res)=>{
    try {
        const {category=[] , level =[] , primaryLanguage=[],sortBy="price-lowtohigh"} = req.query;
        let filter = {}
        if(category.length){
            filter.category = {$in : category.split(',')};
        }
        if(level.length){
            filter.level = {$in : level.split(',')};
        }
        if(primaryLanguage.length){
            filter.primaryLanguage = {$in : primaryLanguage.split(',')};
        }

        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                sort.pricing = 1
                break;
            case "price-hightolow":
                sort.pricing = -1
                break;
            case "title-atoz":
                sort.tilte = 1
                break;
            case "title-ztoa":
                sort.title = -1
                break;
        
            default:
                sort.pricing = 1
                break;
        }

        const courseList = await Course.find(filter).sort(sort);
        
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
        const courseDetails = await Course.findById(id);

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "No course Found",
                data : null
            })
        }

        //check if the current student purchased this course or not

        

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

const checkCoursePurchaseInfo = async(req , res)=>{
    try {
        
    const {id , studentId} = req.params;
    const studentCourses = await StudentCourses.findOne({
        userId: studentId
    })
    const ifStudentAlreadyBroughtCourse = studentCourses.courses.findIndex(item => item.courseId === id) >-1;
        
    res.status(200).json({
        success : true,
        data : ifStudentAlreadyBroughtCourse
    })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message : "some error occured"
        })
    }
}


module.exports  = {checkCoursePurchaseInfo , getAllStudentViewCourses , getStudentViewCoursesDetails}
