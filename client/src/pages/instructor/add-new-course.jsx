import CourseCurriculum from "@/components/Instructor-view/courses/add-new-courses/course-curriculum";
import CourseLanding from "@/components/Instructor-view/courses/add-new-courses/course-landing";
import CourseSettings from "@/components/Instructor-view/courses/add-new-courses/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList , TabsTrigger} from "@/components/ui/tabs";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { AuthContex } from "@/contex/auth-contex";
import { InstructorContext } from "@/contex/instructor-context";
import { addNewCourseService, fetchInstructorCourseDetailstService, updateCourseDetailsByIdService } from "@/services";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



function AddNewCoursePage(){

    const {courseLandingFormData , courseCurriculumFormData , setCourseLandingFormData,setCourseCurriculumFormData , currentEditedCourseId ,setCurrentEditedCourseId} = useContext(InstructorContext);
    const {auth} = useContext(AuthContex);
    const navigate = useNavigate()
    const params = useParams();
    console.log(params);  


    function isEmpty(value){
        if(Array.isArray(value)){
            return value.length === 0
        }

        return value == "" || value === null || value === undefined;

    }

    function validateFormData(){
        
        for(let key in courseLandingFormData){
            if(isEmpty(courseLandingFormData[key])){
                return false
            }
        }

        let hasFreePreview = false;
        for(let item of courseCurriculumFormData){
            if(isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)){
                return false;
            }
            if(item.freePreview){
                hasFreePreview = true;
            }
        }

        return hasFreePreview;

    }

    async function handleCreateCourse(){
       const courseFinalFormData = {
                instructorId : auth?.user?._id,
                instructorName : auth?.user?.userName,
                date : new Date(),
                ...courseLandingFormData,
                student  : [
                    
                ],
                curriculum : courseCurriculumFormData,
                isPublished : true
       }

       const response = currentEditedCourseId !== null ? await updateCourseDetailsByIdService(currentEditedCourseId , courseFinalFormData) :
       await addNewCourseService(courseFinalFormData);

       if(response?.success){
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            setCourseLandingFormData(courseLandingInitialFormData);
            navigate(-1);
            setCurrentEditedCourseId(null);
       }

    }

    async function fetchCurrentCourseDetails(){
        const response = await fetchInstructorCourseDetailstService(currentEditedCourseId);
        if(response?.success){
            const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc,key)=>{
                acc[key] = response?.data[key] || courseLandingInitialFormData[key];
                return acc; 
            } , {})
            console.log(response.data);
            setCourseLandingFormData(setCourseFormData);
            setCourseCurriculumFormData(response?.data?.curriculum);
        }

        

    }

    useEffect(()=>{
        
        if(currentEditedCourseId !== null){
            fetchCurrentCourseDetails();
        }

    } , [currentEditedCourseId])

    useEffect(()=>{
        if(params?.courseId)setCurrentEditedCourseId(params?.courseId);
    } , [params?.courseId])

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between ">
                <h1 className="text-3xl font-extrabold mb-5">Create New Course</h1>
                <Button disabled={!validateFormData()} onClick ={handleCreateCourse}
                className="text-sm tracking-wider font-bold px-8">Submit</Button>
            </div>
            <Card>
                <CardContent>
                    <div className="container mx-auto p-4">
                        <Tabs defaultValue="curriculum" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                                <TabsTrigger value="course-landing-page">Courese Landing Page</TabsTrigger>
                                <TabsTrigger value="settings">Settings</TabsTrigger>
                            </TabsList>
                            <TabsContent value="curriculum">
                                <CourseCurriculum/>
                            </TabsContent>
                            <TabsContent value="course-landing-page">
                                <CourseLanding/>
                            </TabsContent>
                            <TabsContent value="settings">
                                <CourseSettings/>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddNewCoursePage;