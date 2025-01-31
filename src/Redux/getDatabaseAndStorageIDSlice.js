import { createSlice } from "@reduxjs/toolkit";

const dBsTiD = createSlice({
    name: "DbStId",
    initialState:{
        // Meals:null,
        dbId:'',
        stId:'',
        error:null,
    },
    reducers:{
        setDbId:(state,action) => {
            state.dbId = action.payload
        },
        setStId:(state,action) => {
            state.stId = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          }, 
    }
})
export const {setDbId, setStId , setError } = dBsTiD.actions;
export default dBsTiD.reducer;