import Api from "../../api";

// Register user
export const register = async(user)=>{
    try{
        const response =  await Api.post('/auth/register', user);
        return response.data
    }catch(error){
        throw error
    }
}

// Login user
export const login = async(user)=>{
    try{
        const response =  await Api.post('/auth/login', user);
        return response.data
    }catch(error){
        throw error
    }
}

// Get Usr
export const myAccount = async()=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.get('/auth/me', { headers : {
            'Authorization' : `Bearer ${token}`
        }
          });
        return response.data
    }catch(error){
        throw error
    }
}

// Google Login 
export const googleLogin = async(token)=>{
    try{
        const response =  await Api.post('/auth/google', {token});
        return response.data
    }catch(error){
        throw error
    }
}

// Update user 
export const updateAccount = async(user)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.patch('/auth/me', user, { headers : {
            'Authorization' : `Bearer ${token}`,
             "Content-Type": "multipart/form-data"
            }
        });

        return response.data
    }catch(error){
        throw error
    }
}

// UPDATE PASSWORD
export const updatePassword = async(data)=>{
    try{
        const token = localStorage.getItem('token')
        const response =  await Api.patch('/auth/change-password', data, { headers : {
            'Authorization' : `Bearer ${token}`,
            }
        });
        return response.data
    }catch(err){
        throw err.response?.data || err.message || "An error occurred";
    }
}