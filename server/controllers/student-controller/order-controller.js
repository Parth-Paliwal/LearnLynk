const paypal = require("../../helpers/paypal")
const Order = require("../../models/Order");
const StudentCourses = require("../../models/StudentCourses")
const Course = require("../../models/Course");

const createOrder = async(req , res)=>{
    try {
        
        const {
            userId ,
            userName ,
            userEmail ,
            orderStatus ,
            paymentMethod ,
            paymentStatus ,
            orderDate ,
            paymentId  ,
            payerId ,
            instructorId ,
            instructorName ,
            coureseImage ,
            courseTitle ,
            courseId ,
            coursePricing ,
        } = req.body;

        const create_payment_json = {
            intent : 'sale',
            payer : {
                payment_method : 'paypal'
            },
            redirect_urls: {
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
              },
              transactions :  [
                {
                    item_list:{
                        items : [
                            {
                                name : courseTitle,
                                sku :  courseId,
                                price : coursePricing,
                                currency : "USD",
                                quantity : 1
                            }
                        ]
                    },
                    amount : {
                        currency : 'USD',
                        total : coursePricing.toFixed(2)
                    },
                    description : courseTitle,

                }
            ]
            
        }

        paypal.payment.create(create_payment_json , async(error  , paymentInfo)=>{
           if(error){
            console.log(error);
            return res.status(500).json({
                success : false,
                message : 'Error while creating paypal payment'
            })
           }else{
            const newlyCreatedCourseOrder = new Order({
                userId ,
            userName ,
            userEmail ,
            orderStatus ,
            paymentMethod ,
            paymentStatus ,
            orderDate ,
            paymentId  ,
            payerId ,
            instructorId ,
            instructorName ,
            coureseImage ,
            courseTitle ,
            courseId ,
            coursePricing
            })
            await newlyCreatedCourseOrder.save();
            const approveUrl = paymentInfo.links.find(link=>link.rel == 'approval_url').href;
            res.status(200).json({
                success : true,
                data : {
                    approveUrl ,
                    orderId : newlyCreatedCourseOrder._id
                }
            })
           } 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message :"some error occured"
        })
    }
}

const capturePaymentAndFinalizeOrder = async(req , res)=>{
    try {
        
        const {paymentId , payerId , orderId}  = req.body;

        let order = await Order.findById(orderId);

        if(!order){
            return res.status(400).json({
                success : false,
                message : "Order does not found"
            })
        }
        order.paymentStatus = 'paid';
        order.orderStatus = 'confirmed'
        order.paymentId = paymentId
        order.payerId = payerId

        await order.save();

        const studentCourses = await StudentCourses.findOne({
            userId : order.userId
        })

        if(studentCourses){
            studentCourses.courses.push({
                courseId : order.courseId,
                title : order.courseTitle,
                instructorId : order.instructorId,
                instructorName : order.instructorName,
                dateOfPurchase : order.orderDate,
                courseImage : order.coureseImage,
            })
            await studentCourses.save();
        }else{
            const newStudentCourse = new StudentCourses({
                userId : order.userId,
                courses : [{
                    courseId : order.courseId,
                    title : order.courseTitle,
                    instructorId : order.instructorId,
                    instructorName : order.instructorName,
                    dateOfPurchase : order.orderDate,
                    courseImage : order.coureseImage,
                }]
            })
            await newStudentCourse.save();

        }

        // update the course schema students;
        await Course.findByIdAndUpdate(order.courseId , {
            $addToSet : {
                student : [{
                    studenId : order.userId,
                    studentName : order.userName,
                    studentEmail : order.userEmail,
                    paidAmount : order.coursePricing,
                }]
            }
        })

        res.status(200).json({
            success : true,
            message : "orderConfirmed",
            data : order
        })
 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message :"some error occured"
        })
    }
}

module.exports = {capturePaymentAndFinalizeOrder , createOrder}