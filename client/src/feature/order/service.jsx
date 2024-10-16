import Api from "../../api";

// Get premium order Images 
export const getOrder = async()=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.get('/checkout/order', { headers : {
             'Authorization' : `Bearer ${token}`
            }
        });
       return response.data
    }catch(error){
        throw error
    }
}

// Get Premium Image
export const getPremium = async(id)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.post('/checkout',  {id}, { headers : {
             'Authorization' : `Bearer ${token}`
            }
        });
        if(response?.data?.url)
            window.location.href = response?.data?.url
    }catch(error){
        throw error
    }
}

// Get Comirm Check Out /session/:sessionId
export const confirmCheckout = async(sessionId)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.get(`/checkout/session/${sessionId}`, { headers : {
             'Authorization' : `Bearer ${token}`
            }
        });
       return response.data;
    }catch(error){
        throw error
    }
}

// Create Order
export const createOrder = async({ id, sessionId })=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.post(`/checkout/order`, { id, sessionId },{ headers : {
             'Authorization' : `Bearer ${token}`
            }
        });
       return response.data;
    }catch(error){
        throw error
    }
}