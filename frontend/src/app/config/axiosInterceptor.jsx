import { refreshThunk } from "../../features/auth/apis/AuthApis.thunk";
import { axiosInstance } from "./axiosInstance";

export const UseApi = (store) => {
  axiosInstance.interceptors.request.use((config) => {
    const { accessToken } = store.getState().authSlice;
    config.headers.Authorization = accessToken;
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error?.response?.status;
      const url = error?.config?.url;

      if (
        status === 401 &&
        !url.includes("/auth/refresh") &&
        !url.includes("/auth/login")
      ) {
        await store.dispatch(refreshThunk()).unwrap();
        return axiosInstance(error.config);
      }

      return Promise.reject(error);
    },
  );
};
