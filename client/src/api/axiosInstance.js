import axios from "axios";

const axiosInstace = axios.create({
    baseURL : "http://localhost:80/"
});

axiosInstace.interceptors.request.use(config=>{
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;

} , (err)=>{
    Promise.reject(err);
})

export default axiosInstace;
