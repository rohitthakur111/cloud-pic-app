import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login, myAccount, register, updateAccount } from './service';


const token = localStorage.getItem('token') || null
// Register User 
export const registerAsync = createAsyncThunk(
    'auth/register',
    async (user)=>{
        const data = await register(user)
        return data;
    }
)

// Login User 
export const loginAsync = createAsyncThunk(
    'auth/login',
    async (user)=>{
        const data = await login(user)
        return data;
    }
)

// Get User 
export const getUserAsync = createAsyncThunk(
    'get/me',
    async ()=>{
        const data = await myAccount()
        return data;
    }
)
// Update Account
export const updateAccountAsync = createAsyncThunk(
    'update/me',
    async (user)=>{
        const data = await updateAccount(user)
        return data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token,
        user: null,
        loading: false,
        error: null,
    },
    reducers : {
        logout : (state)=>{
            state.token = null
            state.user = null
        }
    },
    extraReducers : (builder)=>{
        // Register user
        builder
            .addCase(registerAsync.pending, state=>{
                state.loading = true
                state.error = null
            })
            .addCase(registerAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.token = action.payload?.data?.token
                state.user = action.payload?.data?.user
            })  
            .addCase(registerAsync.rejected, state=>{
                state.loading = false
                state.error = 'Internal server error'
                state.token = null
                state.user = null
            })

        // Login user
            .addCase(loginAsync.pending, state=>{
                state.loading = true
            })
            .addCase(loginAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.token = action.payload?.data?.token
                state.user = action.payload?.data?.user

            })  
            .addCase(loginAsync.rejected, state=>{
                state.loading = false
                state.error = null
                state.token = null
                state.user = null
            })

        // Get user
            .addCase(getUserAsync.pending, state=>{
                state.loading = true
            })
            .addCase(getUserAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.user = action.payload?.data?.user

            })  
            .addCase(getUserAsync.rejected, state=>{
                state.loading = false
                state.error = null
                state.token = null
                state.user = null
            })
        // Get update user
            .addCase(updateAccountAsync.pending, state=>{
                state.loading = true
            })
            .addCase(updateAccountAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.user = action.payload?.data?.user

            })  
           
    }
    
});
export const { logout } = authSlice.actions
export const  authToken = state=>state?.auth?.token
export const  loginUser = state=>state?.auth?.user
export const  loginLoading = state=>state?.auth?.loading

export default authSlice.reducer;
