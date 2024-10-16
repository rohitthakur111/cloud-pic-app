import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from '../feature/auth/authSlice' 
import  imageSlice  from '../feature/images/imageSlice'
import  visualSlice  from '../feature/visual/visualSlice'
import  whishSlice  from '../feature/whish/whishSlice'
import  orderSlice  from '../feature/order/orderSlice'

export default configureStore({
  reducer: {
    auth : authSlice,
    whish : whishSlice,
    order : orderSlice,
    images : imageSlice,
    visual : visualSlice
  },
})