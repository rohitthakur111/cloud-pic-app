import Api from "../../api";

export const getImages = async()=>{
    try{
        const response =  await Api.get('/images');
        return response.data
    }catch(error){
        throw error
    }
}

export const addImage = async(formData)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.post('/images',  formData, { headers : {
             "Content-Type": "multipart/form-data",
             'Authorization' : `Bearer ${token}`
            }
        }
         );
        return response.data
    }catch(error){
        throw error
    }
}

export const removeImage = async(id)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.delete(`/images/${id}`,{ headers : {
            "Content-Type" :  "multipart/form-data",
            'Authorization' : `Bearer ${token}`
        }});

        response.id = id;
        return response.data
    }catch(error){
        throw error
    }
}
export const editImage = async(id,formData)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.put(`/images/${id}`, formData, { headers : {
            "Content-Type" :  "multipart/form-data",
            'Authorization' : `Bearer ${token}`
        }});
        response.id = id;
        return response.data
    }catch(error){
        throw error
    }
}

export const getImage = async(id)=>{
    try{
        const response =  await Api.get(`/images/${id}` );
        return response.data
    }catch(error){
        throw error
    }
}

export const getImageList = async( query )=>{
    try{
        const response =  await Api.get('/images/list?' + query); 
        return response.data
    }catch(error){
        throw error
    }
}