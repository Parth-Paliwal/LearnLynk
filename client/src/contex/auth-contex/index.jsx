import axiosInstace from "@/api/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";
import { InitialSingUpFormdata } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContex = createContext(null);

export default function AuthProvider({children}){

    const [signinFormData , setsigninFormData] = useState(InitialSingUpFormdata);
    const [signupFormData , setsignupFormData] = useState(InitialSingUpFormdata);
    const [auth , setAuth] = useState({
        authenticate : false,
        user : null
    }); 
    const [loading , setLoading] = useState(true);

    async function handleRegisterUser(e){
        e.preventDefault();
        const data = await registerService(signupFormData);
        // console.log(data);
    }

    async function handleLoginUser(e){
        e.preventDefault();
        const data = await loginService(signinFormData);

        if(data.success){
            sessionStorage.setItem("accessToken"  , JSON.stringify(data.data.accessTocken));
            setAuth({
                authenticate : true,
                user : data.data.user
            });
        }else{
            setAuth({
                authenticate : false,
                user : null
            });
        }

    }

    //check auth user

    async function checkAuthUser(){
        try {
            const data = await checkAuthService();
            if (data.success) {
              setAuth({
                authenticate: true,
                user: data.data.user,
              });
              setLoading(false);
            } else {
              setAuth({
                authenticate: false,
                user: null,
              });
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
            if (!error?.response?.data?.success) {
              setAuth({
                authenticate: false,
                user: null,
              });
              setLoading(false);
            }
          }
    }

    useEffect(()=>{
        checkAuthUser();
    } , [])

    function resetCredentials(){
        setAuth({
            authenticate : false,
            user : null
        })
    }


    return <AuthContex.Provider value={{ 
        signinFormData ,
        signupFormData ,
        setsigninFormData ,
        setsignupFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials
    }}>{loading ? <Skeleton /> : children}</AuthContex.Provider>
}