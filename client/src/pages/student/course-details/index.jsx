import StudentViewCommonLayout from "@/components/Student-view/common-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentContext } from "@/contex/student-context"
import { fetchStudentViewCourseDetailsService } from "@/services";
import { Globe } from "lucide-react";
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom";

function StudentViewCourseDetailsPage(){

    const {loadingState , setLoadingState , studentViewCourseDetails , setStudentViewCourseDetails , currentCourseDetailsId , setCurrentCourseDetailsId }
     = useContext(StudentContext);

     const {id} = useParams();

    async function fetchStudentViewCourseDetails(){
        const response = await fetchStudentViewCourseDetailsService(currentCourseDetailsId);
        if(response?.success){
            setStudentViewCourseDetails(response?.data);
            setLoadingState(false);
        }else{
            setStudentViewCourseDetails(null);
            setLoadingState(false);
        }
    }

     useEffect(()=>{
        if(currentCourseDetailsId !== null){
            fetchStudentViewCourseDetails(id);
            
        }
     } , [currentCourseDetailsId])

     useEffect(()=>{
        if(id)setCurrentCourseDetailsId(id);
     } , [id])

     if(loadingState) return <Skeleton/>

    return (
        <>
            <StudentViewCommonLayout/>
            <div className="container mx-auto p-4">
                <div className= "mx-4 bg-gray-900 text-white p-8 rounded-t-lg ">
                    <h1 className="text-3xl font-bold mb-4 ">{studentViewCourseDetails?.title}</h1>
                    <p className="text-xl mb-4 ">{studentViewCourseDetails?.subtitle}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span>Created By : {studentViewCourseDetails?.instructorName}</span>
                        <span>Created on : {studentViewCourseDetails?.date.split("T")[0]}</span>
                        <span className="flex items-center">
                            <Globe className="mr-1 h-4 w-4"/>
                            {studentViewCourseDetails?.primaryLanguage}
                        </span>
                        <span>
                            {studentViewCourseDetails?.students.length}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentViewCourseDetailsPage