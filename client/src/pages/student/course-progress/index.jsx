import StudentViewCommonLayout from "@/components/Student-view/common-layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/video-player";
import { AuthContex } from "@/contex/auth-contex";
import { StudentContext } from "@/contex/student-context";
import { getCurrentCourseProgressservice } from "@/services";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate, useParams } from "react-router-dom";

function StudentViewCourseProgressPage() {
  const { auth } = useContext(AuthContex);
  const { studentCourseProgress, setStudentCourseProgress } =
    useContext(StudentContext);

  const navigate = useNavigate();
  const params = useParams();
  const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showCourseCompleteDialog, setShowCourseCompleteDialog] =
    useState(false);
  const [showConfitti, setShowConfitti] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { id } = params;

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressservice(id, auth?.user?._id);
    console.log(response);
    if (response.success) {
      if (!response?.data?.isPurchased) {
        setLockCourse(true);
      } else {
        setStudentCourseProgress({
          courseDetails: response?.data?.courseDetails,
          progress: response?.data?.progress,
        });
        if (response?.data?.completed) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
          setShowCourseCompleteDialog(true);
          setShowConfitti(true);
        }
        if (response?.data?.progress.length === 0) {
          setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
        } else {
        }
      }
    }
  }

  useEffect(() => {
    fetchCurrentCourseProgress();
  }, [id]);

console.log(currentLecture);

  return (
    <>
      <StudentViewCommonLayout />
      <div className="flex flex-col h-screen bg-[#1c1d1f] text-white ">
        {showConfitti && <ReactConfetti />}

        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1c1d1f]">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/student-courses")}
              className="text-white font-bold border-2 flex items-center justify-center border-white"
              variant="ghost"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <h1 className="text-lg font-bold hidden md:block">
              {studentCourseProgress?.courseDetails?.title}
            </h1>
          </div>
          <Button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
            {isSideBarOpen ? (
              <ChevronRight className=" h-5 w-5 " />
            ) : (
              <ChevronLeft className=" h-5 w-5" />
            )}
          </Button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1">
            <VideoPlayer
              width="100%"
              height="500px"
              url={currentLecture?.videoUrl}
              onProgressUpdates={setCurrentLecture}
              progressData = {currentLecture}
            />
            <div className="p-6 bg-[#1c1d1f]">
              <h2 className="text-2xl font-bold mb-2 ">
                {currentLecture?.title}
              </h2>
            </div>
          </div>

          {isSideBarOpen && (
            <div className="w-[400px] bg-[#1c1d1f] border-l border-gray-700 transition-all duration-300 overflow-y-auto">
              <Tabs defaultValue="content" className="h-full flex flex-col">
              <TabsList className="grid bg-[rgb(28,29,31)] w-full grid-cols-2 p-0 h-14">
                    <TabsTrigger value='content' className=" bg-white text-black rounded-none h-full ">
                        Course Content
                    </TabsTrigger>
                    <TabsTrigger value='overview' className=" bg-white text-black rounded-none h-full ">
                        Overview
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='content'>
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-4 ">
                        {
                            studentCourseProgress?.courseDetails?.curriculum.map(item=>(
                                <div className="flex items-center space-x-2 text-sm text-white font-bold cursor-pointer" key={item._id}>
                                    <span>
                                        {item?.title}
                                    </span>
                                </div>
                            ))
                        }
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent className="flex-1 overflow-hidden" value='overview'>
                    <ScrollArea className="h-full ">
                        <div className="p-4 ">
                            <h2 className="text-xl font-bold mb-4">About this Course</h2>
                            <p className="text-gray-500 ">
                                {studentCourseProgress?.courseDetails?.description}
                            </p>
                        </div>
                    </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        <Dialog open={lockCourse}>
          <DialogContent className="sm w-[425px]">
            <DialogHeader>
              <DialogTitle>You Can't view this Page</DialogTitle>
              <DialogDescription>
                Please Purchase this course to view
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={showCourseCompleteDialog}>
          <DialogContent className="sm w-[425px]">
            <DialogHeader>
              <DialogTitle>Congratulations</DialogTitle>
              <DialogDescription className="flex flex-col gap-3">
                <Label>You have completed the course!!!</Label>
                <div className="flex flex-row gap-3">
                  <Button>My courses Page</Button>
                  <Button>Rewatch Course</Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default StudentViewCourseProgressPage;
