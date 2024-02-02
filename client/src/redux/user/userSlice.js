import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currentUser:null,
    error:null,
    loading:null
}
const userSlice=createSlice({
   name:'user',
   initialState,
   reducers:{
    signInStart:(state)=>{
        state.loading=true;
    },
  
   signInSuccess:(state,action)=>{
       state.currentUser=action.payload;
       state.loading=false;
       state.error=null;
   },
   signInFailure:(state,action)=>{
       state.error=action.payload;
       state.loading=false;
   },
   updateUserStart:(state)=>{
         state.loading=true;
   },
   updateUserSucess:(state,action)=>{
           state.currentUser=action.payload;
           state.loading=false;
           state.error=null;
   },
   updateUserFilure:(state,action)=>{
           state.error=action.payload
           state.loading=false;
   },
   deleteUserStart:(state)=>{
        state.loading=true;
   },
   deleteUserSucess:(state,action)=>{
    state.currentUser=null;
    state.loading=false;
    state.error=null;
    },
    deleteUserFilure:(state,action)=>{
    state.error=action.payload
    state.loading=false;
     },
     signoutUserStart:(state)=>{
        state.loading=true;
   },
   signoutUserSucess:(state,action)=>{
    state.currentUser=null;
    state.loading=false;
    state.error=null;
    },
    signoutUserFilure:(state,action)=>{
    state.error=action.payload
    state.loading=false;
     },
   }
})
export const {signInStart,signInFailure,signInSuccess,updateUserStart,updateUserSucess,updateUserFilure,
deleteUserFilure,deleteUserStart,deleteUserSucess,signoutUserFilure,signoutUserSucess,signoutUserStart}=userSlice.actions;
export default userSlice.reducer;

