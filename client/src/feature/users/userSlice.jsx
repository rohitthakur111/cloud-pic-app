import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUsers } from "./service";

export const getUsersAsync = createAsyncThunk(
    '/get/users',
    async()=>{
        const data = await getUsers()
        return data;
    }
)

// Delete user Async 
export const deleteuserAsync = createAsyncThunk(
    '/delete/user',
    async(id)=>{
        const data = await deleteUser(id)
        return data
    }
)
const findUserIndex = (users,id)=>{
    const user = users.find(user=> user._id === id)
    return users.indexOf(user)
}
const userSlice = createSlice({
    name : "users",
    initialState : {
        users : [],
        loading : false,
        error : null
    },
    extraReducers : (builder)=>{
        builder
            .addCase(getUsersAsync.pending, (state=>{
                state.loading = true;
                state.error = null;
                state.users = [];
            }))
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.users = action.payload?.users
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.payload.error || 'Internal server error'
            })

            // delete user 
            .addCase(deleteuserAsync.fulfilled, (state, action)=>{
                const index = findUserIndex(state.users, action.payload.id)
                if(index > -1) {
                    state.users = state.users.filter((_,i)=> i !== index)
                }
            })
    }
})
    
export const users = state => state?.users?.users

export default userSlice.reducer