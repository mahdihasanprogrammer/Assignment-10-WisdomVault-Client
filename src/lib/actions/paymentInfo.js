import { serverMutation } from "../core/server"

export const addPaymentInfo = async(paymentInfo) =>{
    const result = await serverMutation(`/api/payment-info`, paymentInfo);
    return result
}