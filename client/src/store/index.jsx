import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from '../feature/auth/authSlice' 
import  imageSlice  from '../feature/images/imageSlice'
import  visualSlice  from '../feature/visual/visualSlice'

export default configureStore({
  reducer: {
    auth : authSlice,
    images : imageSlice,
    visual : visualSlice
  },
})