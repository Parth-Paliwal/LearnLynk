import StudentViewCommonLayout from "@/components/Student-view/common-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


function PaypalPaymentReturnPage(){

    const location = useLocation();
    const navigate  = useNavigate();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    useEffect(()=>{
        if(payerId && paymentId){
            async function capturePayment(){
                const orderId = JSON.parse(sessionStorage.getItem('currentOrderID'));
                const response = await captureAndFinalizePaymentService(
                    paymentId  ,
                    payerId ,
                    orderId ,
                );
                if(response?.success){
                    sessionStorage.removeItem('currentOrderID');
                    navigate('/student-courses')
                }
            }
            capturePayment()
        }
    } , [paymentId , payerId] )

    return (
        <>
        <StudentViewCommonLayout/>
        <Card>
            <CardHeader>
                <CardTitle>
                    Processing Payment.... Please Wait
                </CardTitle>
            </CardHeader>
        </Card>
        </>
    )
}

export default PaypalPaymentReturnPage;