import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../app/config/axiosInstance";
import toast from "react-hot-toast";

export const registerApiThunk = createAsyncThunk("register", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return Promise.reject(error);
  }
});

export const getMeThunk = createAsyncThunk("getMe", async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const refreshThunk = createAsyncThunk("refresh", async () => {
  try {
    const response = await axiosInstance.post("/auth/refresh");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const loginThunk = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return Promise.reject(error);
  }
});

export const logoutThunk = createAsyncThunk('logout' , async () => {
  try {
    const response = await axiosInstance.post('/auth/logout')
    console.log(response)
    return response 
  } catch (error) {
    console.log(error)
      Promise.reject(error)    
  }
})
