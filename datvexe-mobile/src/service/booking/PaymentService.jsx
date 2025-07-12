import fetchWithAuth from "../../utils/fetchWithAuth";

const PaymentService = {
    getUrlVnPayQrCode: (dataReq) => fetchWithAuth(`/payment/create-url-vnpay`, "POST", dataReq),
    getUrlVnPay: (dataReq) => fetchWithAuth(`/payment/create-url-vnpay`, "POST", dataReq),
    getUrlVnPayWeb: (dataReq) => fetchWithAuth(`/payment/create-url-vnpay-web`, "POST", dataReq),
    getUrlVnPayWebQrCode: (dataReq) => fetchWithAuth(`/payment/create-url-vnpay-web-qr-code`, "POST", dataReq),
    getUrlVnPayWebQrCodeByBookingId: (bookingId) => fetchWithAuth(`/payment/create-url-vnpay-web-qr-code
}

export default PaymentService;