import StudentViewCommonLayout from "@/components/Student-view/common-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowLeftToLine, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

function StudentViewCourseProgressPage(){

    const navigate = useNavigate();
    return (
        <>
            <StudentViewCommonLayout/>
            <div className="flex flex-col h-screen bg-[#1c1d1f] text-white ">
                <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1c1d1f]">
                    <div className="flex items-center space-x-4">
                        <Button onClick={()=>navigate('/student-courses')} className="text-white font-bold border-2 flex items-center justify-center border-white" variant= "ghost" >
                        <ArrowLeft className="h-4 w-4" />
                            Back 
                        </Button>
                        <h1></h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentViewCourseProgressPage