import MediaProgressBar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/contex/instructor-context";
import { mediaBulkUploadService, mediaDeleteService, mediaUploadService } from "@/services";
import { Upload } from "lucide-react";
import { useContext } from "react";
import { useRef } from "react";


function CourseCurriculum() {
  const { 
    courseCurriculumFormData, 
    setCourseCurriculumFormData , 
    mediaUploadProgress , 
    setMediaUploadProgress,
    mediaUploadProgressPercentage , 
    setMediaUploadProgressPercentage 
} = useContext(InstructorContext);

  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  };
  console.log(courseCurriculumFormData);

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];

    cpyCourseCurriculumFormData[currentIndex] = {
      ...courseCurriculumFormData[currentIndex],
      title: event.target.value,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  function handleFreePreviewChange(currentValue, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event , currentIndex){
    console.log(event.target.files);

    const selectedFile = event.target.files[0];

    if(selectedFile){
        const videoFormData = new FormData();
        videoFormData.append('file'  , selectedFile);

        try {
            
            await setMediaUploadProgress(true);
            console.log("---->>" , mediaUploadProgress);

            const response= await mediaUploadService(videoFormData , setMediaUploadProgressPercentage);

            if (response.success) {
                let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
                cpyCourseCurriculumFormData[currentIndex] = {
                  ...cpyCourseCurriculumFormData[currentIndex],
                  videoUrl: response?.data?.url,
                  public_id: response?.data?.public_id,
                };
                setCourseCurriculumFormData(cpyCourseCurriculumFormData);
                setMediaUploadProgress(false);
              }

        } catch (error) {
            console.log(error)
        }

    }

  }

  const isCourseCurriculumFormDataValid = ()=>{
    return courseCurriculumFormData.every(item => {
        return (item && typeof item === 'object' && 
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== "")
    })
  }

  async function handleReplaceVideo(currentIndex){
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    const getCurrentVideoPublicId = cpyCourseCurriculumFormData[currentIndex].public_id;

    const deleteCurrentMediaResponses = await mediaDeleteService(getCurrentVideoPublicId)
    
    if(deleteCurrentMediaResponses?.success){
      cpyCourseCurriculumFormData[currentIndex] = {
        ...courseCurriculumFormData[currentIndex],
        videoUrl : '',
        public_id : ''
      }
      setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

  }

  function areAllCourseCurriculumFormDataObjectsEmpty(arr){

    return arr.every((obj)=>{
      return Object.entries(obj).every(([key , value])=>{
        if(typeof value === 'boolean'){
          return true
        }else{
          return value === ''
        }
      })
    })

  }

  const bulkUploadInputRef = useRef(null);

   function handleOpenBulkUploadDialog(){
    bulkUploadInputRef.current?.click()
  }
  async function handlemediaBulkUpload(event){
    const selectedFiles = Array.from(event.target.files);
    const bulkFormdata = new FormData();

    selectedFiles.forEach(fileItem=>bulkFormdata.append('files' , fileItem))

    try {
      
      setMediaUploadProgress(true);
      const response = await mediaBulkUploadService(bulkFormdata , setMediaUploadProgressPercentage);
      // console.log(response);
      if(response?.success){
        let cpyCourseCurriculumFormData = areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
    ? []
    : [...courseCurriculumFormData];
    
    cpyCourseCurriculumFormData = [
      ...cpyCourseCurriculumFormData,
      ...response?.data.map((item, index) => ({
        videoUrl: item?.url,
        public_id: item?.public_id,
        title: `Lecture ${
          cpyCourseCurriculumFormData.length + (index + 1)
        }`,
        freePreview: false,
      })),
    ];
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    console.log(courseCurriculumFormData);
          setMediaUploadProgress(false);

      }


    } catch (error) {
      console.log(error)
    }

  }

  async function handleDeleteLecture(currentIndex)
{
  let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
  const getCurrentSelectedVideoPublicId = cpyCourseCurriculumFormData[currentIndex]?.public_id;

  const response = await mediaDeleteService(getCurrentSelectedVideoPublicId);
  if(response?.success){
    cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter((_ , index)=>index !== currentIndex);
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }
}
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Course Curriculum</CardTitle>
        <div>
          <Input
            type="file" 
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            className="hidden"
            id="bulk-media-upload"
            onChange={handlemediaBulkUpload}
          />
          <Button as="label" htmlFor="bulk-media-upload" varient="outline" className="cursor-pointer"
            onClick={handleOpenBulkUploadDialog}
          >
            <Upload className="w-4 h-5 mr-2 "/>
            Bulk Upload 
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} onClick={handleNewLecture}>Add Lecture</Button>
        {
            mediaUploadProgress ? 
            <MediaProgressBar
                IsMediaUploading={mediaUploadProgress}
                progress={mediaUploadProgressPercentage}
            /> :  null
        }
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className="border p-5  rounded-md ">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lectures {index + 1} </h3>
                <Input
                  name={`title-${index + 1}`}
                  placeholder="Enter lecture title"
                  className="max-w-96"
                  onChange={(event) => {
                    handleCourseTitleChange(event, index);
                  }}
                  value={courseCurriculumFormData[index]?.title}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={(value) =>
                      handleFreePreviewChange(value, index)
                    }
                    checked={courseCurriculumFormData[index]?.freePreview}
                    id={`freePreview-${index + 1}`}
                  />
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free preview
                  </Label>
                </div>
              </div>
              <div className="mt-6">

                    {
                        courseCurriculumFormData[index]?.videoUrl ? 
                            <div className="flex gap-3 ">
                                <VideoPlayer url={courseCurriculumFormData[index]?.videoUrl} width="450px" height="200px"/>
                                <Button onClick={()=>handleReplaceVideo(index)}> Replace Video</Button>
                                <Button onClick={()=>{handleDeleteLecture(index)}} className="bg-red-900"> Delete Lecture</Button>
                            </div>
                            :
                            <Input type="file" accept="video/*" onChange={(event)=>handleSingleLectureUpload(event , index)} className="mb-4" />
                    }

              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
