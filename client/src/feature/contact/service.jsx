import Api from "../../api";

export const addConatctQuery = async (data)=>{
    try{
        const response = await Api.post('/contact',data)
        return response.data
    }catch(err){
        throw err
    }
}