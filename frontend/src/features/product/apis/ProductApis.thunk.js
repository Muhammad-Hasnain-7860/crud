import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../app/config/axiosInstance";

export const getAllProductsThunk = createAsyncThunk(
  "getAllProduct",
  async () => {
    try {
      const response = await axiosInstance.get("/product");
      return response.data;
    } catch (error) {
      Promise.reject(error);
    }
  },
);

export const createProductThunk = createAsyncThunk(
  "createProduct",
  async (data) => {
    try {
      const response = await axiosInstance.post("/product/create", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
);

export const yourProductThunk = createAsyncThunk("yourProducts", async () => {
  try {
    const response = await axiosInstance.get("/product/user/userProduct");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const getSingleProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateProductThunk = createAsyncThunk(
  "update",
  async ({ id, data }) => {
    try {
      const response = await axiosInstance.put(`/product/${id}`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
);
