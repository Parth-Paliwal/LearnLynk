import StudentViewCommonLayout from "@/components/Student-view/common-layout";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


function PaypalPaymentReturnPage(){

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId')
    const payerId = params.get('PayerID')

    useEffect(()=>{
        if(payerId && paymentId){
            async function capturePayment(){
                const currentOrderId = JSON.parse(sessionStorage.getItem(''))
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