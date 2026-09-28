import { createBrowserRouter, RouterProvider } from "react-router";
import ProductCard from "../../features/product/ui/components/AllProducts";
import Register from "../../features/auth/ui/components/Register";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthLayout from "../layout/AuthLayout";
import Login from "../../features/auth/ui/components/Login";
import CreateProduct from "../../features/product/ui/components/CreateProduct";
import YourProduct from "../../features/product/ui/components/YourProduct";
import SingleProduct from "../../features/product/ui/components/SingleProduct";
import Protected from "./Protected";
import MainProtected from "./MainProtected";
import MainLayout from "../layout/MainLayout";
import { getMeThunk } from "../../features/auth/apis/AuthApis.thunk";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProductCard />,
    },

    {
      path: "/auth",
      element: <Protected />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
      ],
    },

    {
      path: "/product",
      element: <MainProtected />,
      children: [
        {
          path: "",
          element: <MainLayout />,
          children: [
            {
              path: "create-product",
              element: <CreateProduct />,
            },
            {
              path: "your-product",
              element: <YourProduct />,
            },
          ],
        },
      ],
    },

    {
      path: "/product/:id",
      element: <SingleProduct />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};

export default AppRouter;
