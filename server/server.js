require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL;
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes")
const studentViweCouseRoutes = require("./routes/student-routes/course-routes")
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-course-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes")

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET" , "POST" , "DELETE" , "PUT"],
    allowedHeaders : ['Content-Type' , 'Authorization']
}))

app.use(express.json());

//database connnection
mongoose.connect(MONGO_URI)
.then(()=>console.log("detabase connected successfully"))
.catch(e=>console.log(e));

//routes configuration

app.use("/auth"   , authRoutes);
app.use("/media" , mediaRoutes);
app.use("/instructor/course" , instructorCourseRoutes);
app.use("/student/course" , studentViweCouseRoutes);
app.use("/student/order" , studentViewOrderRoutes);
app.use("/student/courses-bought"  , studentCoursesRoutes);
app.use('/student/course-progress' , studentCourseProgressRoutes);


app.listen(80 , ()=>{
    console.log(`server is listning on port : ${PORT}`);
})