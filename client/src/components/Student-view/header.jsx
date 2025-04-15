import { GraduationCap } from "lucide-react"


function StudentViewCommonHeader() {
    return (
        <header className="flex items-center justify-between p-4 border-b relative">
            <div className="fles items-center space-x-4">
                <Link to="/home">
                    <GraduationCap className="h-8 w-8 mr-4 hover:bg-black"/>
                </Link>
            </div>
        </header>
    )
}

export default StudentViewCommonHeader