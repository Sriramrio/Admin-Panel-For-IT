import { configureStore } from "@reduxjs/toolkit";
import EmpdataReducer from '../AppComponents/Redux/Slicecomponent/Empdataslice'
import registerdata from 'src/AppComponents/Redux/Slicecomponent/registerSlice'
export const store=configureStore({
    reducer:{
        Registerlogin:registerdata,
        project:EmpdataReducer,
    }
})