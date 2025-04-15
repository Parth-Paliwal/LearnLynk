const express = require("express");

const multer = require("multer");

const {uploadMeduaToCloudinary , deleteMediaFromCloudinary} = require("../../helpers/cloudinary");

const router = express.Router();

const upload = multer({dest : "uploads/"});

router.post('/upload' , upload.single('file') , async(req , res)=>{
     try {
         
        const result = await uploadMeduaToCloudinary(req.file.path);
        res.status(200).json({
             success :  true,
             data :  result
        })

     } catch (error) {
        res.status(500).json({
            success :  false,
            message : 'Error uploading file'
        })
     }
})


router.delete('/delete/:id' , async(req , res)=>{
    try {
        
        const {id} = req.params;

        if(!id){
            res.status(400).json({
                success :  false,
                message : "id does not found"
            })
        } 

        await deleteMediaFromCloudinary(id);

        res.status(200).json({
            success : true,
            message :  "Assest deleted successfullly from cloudinary"
        })


    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error while deleting"
        })
    }
})

router.post('/bulk-upload' , upload.array('files', 10) , async(req , res)=>{

    try {
        
        const uploadPromise = req.files.map(fileItem=> uploadMeduaToCloudinary(fileItem.path))

        const results = await Promise.all(uploadPromise);

        res.status(201).json({
            success : true,
            data : results,
        })

    } catch (error) {
        res.status(500).json({
            success : false,
            message : "error while deleting"
        })
    }

})

module.exports = router;
