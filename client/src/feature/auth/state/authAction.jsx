import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAccessToken } from "../../../config/axiosinstens.js";

export const registerUser = createAsyncThunk(
   "/auth/register",async(credentials,thunkApi)=>{
 try {
    let response = await api.post("/auth/register",credentials)
   setAccessToken(response.data.data.accessToken)
    return response.data
 } catch (error) {
    return thunkApi.rejectWithValue(error.response.data) || "somthing went wrong"
 }
})

export const getMe = createAsyncThunk( "/auth/me",
  async (_, thunkApi) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);


export const loginUser = createAsyncThunk("/auth/login",async(credentials,thunkApi)=>{
   try{
      let response = await api.post("/auth/login",credentials)
       let token = response.data.data.accessToken
       setAccessToken(token)
      return response.data
   }catch(error){
      return thunkApi.rejectWithValue(error.response.data) || "somthing went wrong"
   }
})

export const logoutUser = createAsyncThunk("/auth/logout",async(_,thunkApi)=>{
  try{
    let res = await api.get("/auth/logout")
    console.log(res.data)
    return res.data
  }catch(error){
     return thunkApi.rejectWithValue(error.response.data) || "somthing went wrong"
  }
})