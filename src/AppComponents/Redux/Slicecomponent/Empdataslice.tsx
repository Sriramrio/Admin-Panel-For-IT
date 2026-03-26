import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  selectedProject: null
};


const Empdataslice =createSlice({
    name:"project",
    initialState,
    reducers:{
        setSelectedProject:(state,action)=>{
            state.selectedProject=action.payload;
        }
    }
});

export const { setSelectedProject }=Empdataslice.actions;
export default Empdataslice.reducer;
