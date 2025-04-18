import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common-form";
import { signUpControls , signInControls} from "@/config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContex } from "@/contex/auth-contex";
function AuthPage() {
    const [activeTabs , setActiveTabs] = useState('signin');
    const {signinFormData ,
         signupFormData ,
          setsigninFormData ,
           setsignupFormData,
           handleRegisterUser,
           handleLoginUser}=
            useContext(AuthContex);

    const handleTabChange = (value)=>{
        setActiveTabs(value);
    }

    function checkIfSiginInFormIsValid(){
        return  signinFormData.userEmail !== "" && signinFormData.password !== "";
    }

    function checkIfSiginUpFormIsValid(){
        return  signupFormData.userEmail !== "" && signupFormData.password !== "" && signupFormData.userName !== "";
    }

    return (
        
        <>
            <div className="flex flex-col min-h-screen">
                <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <Link to={"/"} className="flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 mr-4"/>
                    <span className="font-extrabold text-xl">LMS Learn</span>
                </Link>
                </header>
                <div className="flex items-center justify-center min-h-screen bg-background">
                    
                <Tabs value={activeTabs} defaultValue="signin" onValueChange={handleTabChange}
                    className = "w-full max-w-md ">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="signin">Sign In</TabsTrigger> 
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value="signin">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>
                                    Sign In to your account
                                </CardTitle>
                                <CardDescription>
                                    Enter your email and password to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                            <CommonForm
                                formControls={signInControls}
                                buttonText={"SiginIn"}
                                formData={signinFormData}
                                setFormData={setsigninFormData}
                                isButtonDisabled={!checkIfSiginInFormIsValid()}
                                handleSubmit={handleLoginUser}
                            />
                            </CardContent>
                        </Card>
                        </TabsContent>
                        <TabsContent value="signup">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>
                                    Create New Account
                                </CardTitle>
                                <CardDescription>
                                    Enter your details to get started
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                            <CommonForm
                                formControls={signUpControls}
                                buttonText={"SiginUp"}
                                formData={signupFormData}
                                setFormData={setsignupFormData}
                                isButtonDisabled={!checkIfSiginUpFormIsValid()}
                                handleSubmit={handleRegisterUser}
                            />
                            </CardContent>
                        </Card>
                        </TabsContent>
                </Tabs>
                </div>
            </div>
        </>
    )
}

export default AuthPage;
