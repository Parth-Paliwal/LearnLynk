import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDownIcon } from "lucide-react"


function StudentViewCoursesPage(){
    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4"> 
                Courses
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
                <aside className="w-full md:w-64 space-y-4">
                    <div className="p-4 space-y-4">
                        
                    </div>
                </aside>
                <main className="flex-1">
                    <div className="flex justify-end items-center mb-4 gap-5">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <ArrowUpDownIcon className="h-4 w-4 "/>
                                    <span>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default StudentViewCoursesPage
