import axiosInstace from "@/api/axiosInstance";
export  async function registerService(formData){
    const {data} = await axiosInstace.post('/auth/register' , {
        ...formData,
        role: "user"
    })
    return data;
} 

export  async function loginService(formData){
    const {data} = await axiosInstace.post('/auth/login' ,formData);
    console.log(data);
    return data;
} 

export  async function checkAuthService(){
    const {data} = await axiosInstace.get('/auth/check-auth');
    return data;
}


export  async function mediaUploadService(formData , onProgressCallback){
    const {data} = await axiosInstace.post('/media/upload' , formData , 
        {onUploadProgress : (progressEvent)=>{
            const percentCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
            onProgressCallback(percentCompleted);
        }}
    );
    return data;
}

export  async function mediaDeleteService(public_id){
    const {data} = await axiosInstace.delete(`/media/delete/${public_id}`);
    return data;
}

export async function fetchInstructorCourseListService(){
    const {data} = await axiosInstace.get(`/instructor/course/get`);
    return data;
}

export async function addNewCourseService(formData){
    const {data} = await axiosInstace.post(`/instructor/course/add`, formData);
    return data;
}

export async function fetchInstructorCourseDetailstService(id){
    const {data} = await axiosInstace.get(`/instructor/course/get/details/${id}`);
    return data;
}

export async function updateCourseDetailsByIdService(id , formData){
    const {data} = await axiosInstace.put(`/instructor/course/update/${id}`, formData);
    return data;
}

export  async function mediaBulkUploadService(formData , onProgressCallback){
    const {data} = await axiosInstace.post('/media/bulk-upload' , formData , 
        {onUploadProgress : (progressEvent)=>{
            const percentCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
            onProgressCallback(percentCompleted);
        }}
    );
    return data;
}

export async function fetchStudentViewCourseListService(query){
    const {data} = await axiosInstace.get(`/student/course/get?${query}`);
    return data;
}


export async function fetchStudentViewCourseDetailsService(courseID ){
    const {data} = await axiosInstace.get(`/student/course/get/details/${courseID}`);
    return data;
}
export async function createPaymentService(formData){
    const {data} = await axiosInstace.post(`/student/order/create` , formData);
    return data;
}
export async function captureAndFinalizePaymentService(paymentId , payerId , orderId){
    const {data} = await axiosInstace.post(`/student/order/capture` , {paymentId , payerId , orderId});
    return data;
}

export async function fetchStudentBoughtCoursesService(studentId){
    const {data} = await axiosInstace.get(`/student/courses-bought/get/${studentId}`);
    return data;
}

export async function checkCoursePurchaseInfoService(courseID , studentId){
    const {data} = await axiosInstace.get(`/student/course/purchase-info/${courseID}/${studentId}`);
    return data;
}   

export async function getCurrentCourseProgressservice(courseId , userId){
    const {data} = await axiosInstace.get(`/student/course-progress/get/${userId}/${courseId}`);
    return data;
}   

export async function markLectureAsViewedService(courseId , userId , lectureId ){
    const {data} = await axiosInstace.post(`/student/course-progress/mark-lecture-viewed` ,  {courseId , userId , lectureId});
    return data;
}   

export async function resetCourseProgressService(courseId , userId){
    const {data} = await axiosInstace.post(`/student/course-progress/reset-progress` ,  {courseId , userId});
    return data; 
}   

