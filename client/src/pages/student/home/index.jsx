import StudentViewCommonLayout from "@/components/Student-view/common-layout";
import Banner from "../../../../public/BannerImage.jpg";
import Typewriter from "@/components/Typewriter";
import { courseCategories } from "@/config";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/contex/student-context";
import { checkCoursePurchaseInfoService, fetchStudentViewCourseListService } from "@/services";
import { AuthContex } from "@/contex/auth-contex";
import { useNavigate } from "react-router-dom";


function StudentHomePage(){
    const {auth} = useContext(AuthContex);
    const navigate = useNavigate()
    const {studentViewCoursesList , setStudentViewCoursesList} = useContext(StudentContext);

    async function fetchAllStudentViewCourses(){
        const response = await fetchStudentViewCourseListService();
        if(response?.success){
            setStudentViewCoursesList(response?.data)

        }
    }

        async function handleNavigate(getCurrentCourseId){
        const response = await checkCoursePurchaseInfoService(getCurrentCourseId , auth?.user._id);
        
        if(response.success){
            if(response.data){
                navigate(`/courses-progress/${getCurrentCourseId}`);
            }else{
                navigate(`/course/details/${getCurrentCourseId}`);  
            }
        }

    }

    function handleNavigateToCoursesPage(getCurrentId){
        sessionStorage.removeItem('filters');
        const currentFilters = {
            category : [getCurrentId]
        }
        sessionStorage.setItem('filters' , JSON.stringify(currentFilters));
        navigate('/courses  ')
        
    }

    useEffect(()=>{
        fetchAllStudentViewCourses()
    } , [])

    return (
            <>
            <StudentViewCommonLayout/>
            <div className="min-h-screen bg-white ">
                <section className="flex flex-col items-center lg:flex-row justify-between py-8 px-4 lg:px-8">
                    <div className="lg:w-1/2 lg:pr-12">
                        <h1 className="text-5xl font-bold mb-4 relative">
                        Empower Your Learning Journey
                        </h1>
                        <Typewriter
                        text="Unlock limitless opportunities with our all-in-one Learning Management System. Whether you're an aspiring student or a passionate instructor, our platform provides the tools you need to learn, teach, and grow. Explore interactive courses, track your progress, and achieve your goals — anytime, anywhere."
                        speed={100}      
                        pause={2000}/>
                    </div>
                    <div className=" mb-8 lg:mb-0 mr-12">
                        <img 
                            src="../../../../public/BannerImage.jpg" alt="" 
                            width={800} 
                            height={400} 
                            className="rounded-lg shadow-lg "
                            />
                    </div>
                </section>
                <section className="py-8 px-4 lg:px-8 bg-gray-100">
                    <h2 className="text-2xl font-bold mb-6">Course Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {
                            courseCategories.map(categoryItem =>(
                                    <Button onClick={()=>{handleNavigateToCoursesPage(categoryItem.id)}} className="items-center" variant="outline" key={categoryItem.id}>
                                        {categoryItem.label}
                                    </Button>
                            ))
                        }
                    </div>
                </section>
                <section className="py-12 px-4 lg:px-8 ">
                <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
                <div className="grid grid-1 sm:grid-cols-2 lg:grid-cols-4">
                        {
                            studentViewCoursesList && studentViewCoursesList.length >0?
                            studentViewCoursesList.map(courseItem=>
                            <div onClick={()=>{handleNavigate(courseItem?._id)}} className="border-2 border-black rounded-lg overflow-hidden cursor-pointer shadow m-2 ">
                                <img src={courseItem.image} alt=""
                                    width={500}
                                    height={150}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                                    <p className="text-sm text-gray-700 mb-2 " >{courseItem?.instructorName}</p>
                                    <p className="font-bold text-[16px]">${courseItem?.pricing}</p>
                                </div>
                            </div>) : 
                            <h1>No courses found</h1>
                        }
                </div>
                </section>
            </div>
            </>
    )
}

export default StudentHomePage;