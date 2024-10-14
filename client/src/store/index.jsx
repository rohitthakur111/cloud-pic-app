import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from '../feature/auth/authSlice' 
import  imageSlice  from '../feature/images/imageSlice'
import  visualSlice  from '../feature/visual/visualSlice'
import  whishSlice  from '../feature/whish/whishSlice'

export default configureStore({
  reducer: {
    auth : authSlice,
    images : imageSlice,
    whish : whishSlice,
    visual : visualSlice
  },
})