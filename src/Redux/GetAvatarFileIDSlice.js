import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    GetFileId : null,
    GetDocId: null,
    GetEmailID:null,
    GetUserId:null,
    GetDocIdUserProfie:null,
    GetBio:null,
    GetLocation:null,
    GetPhoneNumber:null,
}

const GetFileIdSlice = createSlice({
    name:"getFileId",
    initialState,
    reducers:{
        setfileId:(state,action) => {
            state.GetFileId = action.payload
        },
        setDocId:(state,action) => {
            state.GetDocId = action.payload
        },
        setemailId:(state,action) => {
            state.GetEmailID = action.payload
        },
        setuserId:(state,action) => {
            state.GetUserId = action.payload
        },
        setuserprofiledocumentId:(state,action) => {
            state.GetDocIdUserProfie = action.payload
        },
        setusergetbio:(state,action) => {
            state.GetBio = action.payload
        },
        setuserlocation:(state,action) => {
            state.GetLocation = action.payload
        },
        setuserphonenumber:(state,action) => {
            state.GetPhoneNumber = action.payload
        }
    },
})

export const {setfileId,setDocId,setemailId,setuserId,setuserprofiledocumentId,setusergetbio,setuserlocation,setuserphonenumber} = GetFileIdSlice.actions
export default GetFileIdSlice.reducer