import Api from "../../api"

export const getUsers = async()=>{
    const token = localStorage.getItem('token')
    if(!token) throw ("Login failed!")
    try{
        const response = Api.get('/users', { headers : {
            "Authorization" : `Bearer ${token}`
        }})
        console.log(response)
    }catch(err){
        throw err.message
    }
}