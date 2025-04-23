import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";


function InstructorDashboard({listOfCourses}) {
    
    const config = [
        {
            icon : Users,
            label : "Total Students",
            value : calculateTotalStudentsAndProfits().totalStudents
        },
        {
            icon : DollarSign,
            label : "Total Revenue",
            value : calculateTotalStudentsAndProfits().totalProfit
        },

    ]

    function calculateTotalStudentsAndProfits() {
        if (!listOfCourses || !Array.isArray(listOfCourses)) {
            console.error("listOfCourses is not defined or not an array");
            return { totalProfit: 0, totalStudents: 0, studentList: [] };
        }
    
        const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
            (acc, curr) => {
                
                const studentCount = curr?.student?.length || 0; 
                acc.totalStudents += studentCount;
                acc.totalProfit += curr?.pricing * studentCount;
    
                curr?.student?.forEach((student) => { 
                    acc.studentList.push({
                        courseTitle: curr.title || "Unknown Title",
                        studentName: student.studentName || "Unknown Name",
                        studentEmail: student.studentEmail || "Unknown Email",
                    });
                });
                return acc;
            },
            {
                totalStudents: 0,
                totalProfit: 0,
                studentList: [],
            }
        );
    
        return { totalProfit, totalStudents, studentList };
    }
    console.log(listOfCourses);
    
    return (
        <div>
            <div className="grid grid-clos-1 md:grid-cols-2 gap-6 mb-8">
                {
                   config.map((item , index)=>(
                    <Card key = {index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium ">
                                {
                                    item.label
                                }
                            </CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {
                                         item.value
                                    }
                                </div>
                            </CardContent>
                    </Card>
                   ))
                }
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Student List 
                    </CardTitle>
                    <CardContent>
                        <div className="overflow-x-auto ">
                            <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead >Couse Name</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Student Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                   {    calculateTotalStudentsAndProfits()?.studentList.map((studentItem , index)=>(
                                        <TableRow key={index}>
                                        <TableCell className="font-medium">{studentItem?.courseTitle}</TableCell>
                                        <TableCell>{studentItem?.studentName}</TableCell>
                                        <TableCell>{studentItem?.studentEmail}</TableCell>
                                        </TableRow>
                                        
                                   )) }
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    );

}

export default InstructorDashboard;
