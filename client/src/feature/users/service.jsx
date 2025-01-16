import Api from "../../api"

export const getUsers = async()=>{
    const token = localStorage.getItem('token')
    if(!token) throw ("Login failed!")
    try{
        const response = await Api.get('/users', { headers : {
            "Authorization" : `Bearer ${token}`
        }})
        return response.data
    }catch(err){
        throw err.message
    }
}