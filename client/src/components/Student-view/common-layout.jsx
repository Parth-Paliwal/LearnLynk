import { Outlet } from "react-router-dom";
import StudentViewCommonHeader from "./header";


function StudentViewCommonLayout(){

    return (
        <div>
            <StudentViewCommonLayout/>
            <Outlet/>
        </div>
    )

}

export default StudentViewCommonLayout;