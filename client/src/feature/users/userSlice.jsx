import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "./service";

export const getUsersAsync = createAsyncThunk(
    '/get/users',
    async()=>{
        const data = await getUsers()
        return data;
    }
)
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
    }
})

export const users = state => state?.users?.users

export default userSlice.reducer