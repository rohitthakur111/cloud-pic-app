import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, getOrder } from "./service";

export const getOrderAsync = createAsyncThunk(
    '/get/order',
    async()=>{
        const data = await getOrder();
        return data;
    }
)

// Crete order 
export const createOrderAsync = createAsyncThunk(
    '/create/order',
    async({ id, sessionId })=>{
        const data = await createOrder({ id, sessionId });
        return data;
    }
) 
const orderSlice = createSlice({
    name : "order",
    initialState : {
        loading : false,
        error : null,
        list : [],
    },
    extraReducers : (builder)=>{
        builder
            .addCase(getOrderAsync.pending, state=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderAsync.fulfilled, (state,action)=>{
                state.loading = false;
                state.list = action?.payload?.data?.order;
            })
            .addCase(getOrderAsync.rejected, state=>{
                state.loading = false;
                state.error = 'Failed to get order!';
                state.list = []
            }) 

            // Crete order 
            .addCase(createOrderAsync.pending, state=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrderAsync.fulfilled, (state,action)=>{
                state.loading = false;
                state.list.push(action?.payload?.data?.order);
            })
            .addCase(createOrderAsync.rejected, state=>{
                state.loading = false;
                state.error = 'Failed to get order!';
            }) 
    }
})

export const orderList = state=> state.order.list
export const orderLoading = state=> state.order.loading
export const orderError = state=> state.order.error

export default orderSlice.reducer;