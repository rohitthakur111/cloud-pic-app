import Api from "../../api"

// get whishItem
export const getWhishItem = async()=>{
    try{
        const token = localStorage.getItem('token')
        const response = await Api.get('/whish', { headers : {
            'Authorization' : `Bearer ${token}`,
            }
        });
    return response.data;
    }catch(error){
        throw error
    }
}

// Save  whishItem
export const saveWhishItem = async(id)=>{
    try{
        const token = localStorage.getItem('token')
        const response = await Api.post('/whish', {id}, { headers : {
            'Authorization' : `Bearer ${token}`,
            }
        });
        response.data.id = id;
    return response.data;
    }catch(error){
        throw error
    }
}