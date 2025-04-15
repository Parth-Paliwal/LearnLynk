    import { Button } from "@/components/ui/button"
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config"
    import { InstructorContext } from "@/contex/instructor-context"
    import { Delete, Edit } from "lucide-react"
import { useContext } from "react"
    import { useNavigate } from "react-router-dom"



    function InstructorCourses({listOfCourses}) {

        const navigate = useNavigate();
        const {setCourseLandingFormData,setCourseCurriculumFormData,setCurrentEditedCourseId} = useContext(InstructorContext)
        const handleClick =()=>{
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
        }

        
        return (
            <Card>
                <CardHeader className="flex justify-between flex-row items-center">
                    <CardTitle className="text-3xl font-extrabold">
                        All Courses
                    </CardTitle>
                    <Button onClick={handleClick} className="p-6">
                        New
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto ">

                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Courses</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Revenue</TableHead>
                            <TableHead >Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {listOfCourses && listOfCourses.length > 0
                    ? listOfCourses.map((course) => (
                        <TableRow>
                        <TableCell className="font-medium">
                            {course?.title}
                        </TableCell>
                        <TableCell>{course?.student?.length}</TableCell>
                        <TableCell>
                            ${course?.pricing}
                        </TableCell>
                        <TableCell>
                            <Button
                            onClick={()=>{
                                navigate(`/instructor/edit-course/${course?._id}`)
                            }}
                            variant="ghost"
                            size="sm"
                            >
                            <Edit className="h-8 w-8" />
                            </Button>
                            <Button variant="ghost" size="sm">
                            <Delete className="h-8 w-8" />
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))
                    : null}
                            
                        </TableBody>
                    </Table>


                    </div>
                </CardContent>
            </Card>
        )

    }

    export default InstructorCourses
