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

export async function fetchStudentViewCourseListService(){
    const {data} = await axiosInstace.get(`/student/course/get`);
    return data;
}


export async function fetchStudentViewCourseDetailsService(courseID){
    const {data} = await axiosInstace.get(`/student/course/get/details/${courseID}`);
    return data;
}


