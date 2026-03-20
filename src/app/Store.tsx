import { configureStore } from "@reduxjs/toolkit";

import registerdata from 'src/AppComponents/Redux/Slicecomponent/registerSlice'
export const store=configureStore({
    reducer:{
        Registerlogin:registerdata,
    }
})