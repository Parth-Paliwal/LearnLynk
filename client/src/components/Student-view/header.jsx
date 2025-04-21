import { GraduationCap, TvMinimalPlay } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { AuthContex } from "@/contex/auth-contex";
import { useContext } from "react";

function StudentViewCommonHeader() {

    const {resetCredentials} = useContext(AuthContex)
    const navigate = useNavigate()

    function handleLogout() {
        resetCredentials();
        sessionStorage.clear();
        navigate("/auth")
    }

    return (
        <header className="flex items-center justify-between p-4 border-b relative">
            <div className="flex items-center space-x-4">
                <Link to="/home" className="flex items-center text-blue-600 hover:text-blue-900">
                    <GraduationCap className="h-12 w-12 mr-4 font-bold"/>
                    <span className="font-extrabold md:text-xl text-[14px]">LearnLynk</span>
                </Link>
                <div className="flex items-center space-x-1">
                    <Button onClick={()=>{
                        location.pathname.includes('/courses') ? null : 
                        navigate('/courses')}} variant="ghost" className="text-[14px] md:text-[16px] font-medium">
                        Explore
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-3">
                        <TvMinimalPlay className="w-8 h-8 cursor-pointer "/>
                        <span onClick={()=>navigate('/student-courses')} className="font-extrabold md:text-xl text-[14px] cursor-pointer">My Courses</span>
                    </div>
                    <Button onClick={handleLogout}>
                        Sign Out
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default StudentViewCommonHeader