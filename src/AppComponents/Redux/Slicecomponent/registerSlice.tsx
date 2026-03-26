import { createSlice } from "@reduxjs/toolkit";


const initialState={
    username: "",
    email: "",
    password: "",
    confirm: "",
    success: "" 
}
const registerslice=createSlice({
    name:'registerdata',
    initialState:initialState,
    reducers:{
        
    }

})

export default registerslice.reducer;