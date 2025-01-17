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

// Delete user
export const deleteUser = async(id)=>{
    const token = localStorage.getItem('token')
    if(!token) throw ("Login failed!")
    try{
        const response = await Api.delete(`/users/${id}`, { headers : {
            "Authorization" : `Bearer ${token}`
        }})
        response.data.id = id
        return response.data
    }catch(err){
        throw err
    }
}