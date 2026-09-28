import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductThunk,
  updateProductThunk,
} from "../apis/ProductApis.thunk";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { updateDataFnc } from "../states/ProductStates";
import { useNavigate } from "react-router";
const useProduct = () => {
  const { updateData } = useSelector((store) => store.productSlice);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: updateData,
  });
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.authSlice);
  const { isLoading } = useSelector((store) => store.productSlice);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);

  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (Object.keys(updateData).length > 0) {
      setExistingImages([...updateData.images]);
      setSizes([...updateData.sizes]);
    }
  }, []);

  const navigate = useNavigate();


  const handleClick = async (data) => {
    const formData = new FormData();

    if (Object.keys(updateData).length > 0) {
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          formData.append("newImages", images[i]);
        }
      }
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    if (sizes.length <= 0) {
      return toast.error("sizes is Required");
    }
    const errors = [];

    sizes.forEach((s) => {
      if (!s?.price) {
        errors.push("price is Required");
      }

      if (!s?.stock) {
        errors.push("stock is Required");
      }

      if (s?.price && s.price == 0) {
        errors.push("Price must be greater than 0");
      }

      if (s?.stock && s.stock == 0) {
        errors.push("Stock must be greater than 0");
      }

      if (s?.price && Number.isNaN(Number(s.price))) {
        errors.push("price must be a number");
      }

      if (s?.stock && Number.isNaN(Number(s.stock))) {
        errors.push("Stock must be a number");
      }

      if (s?.price && s.price < 0) {
        errors.push("Price must be a Positive Number");
      }

      if (s?.stock && s.stock < 0) {
        errors.push("stock must be a Positive Number");
      }

      if (s?.stock && Number(s.stock) && !Number.isInteger(Number(s.stock))) {
        errors.push("Stock must be a whole number");
      }
    });

    if (errors.length > 0) {
      const firstError = errors[0];
      return toast.error(firstError);
    }

    if (existingImages.length === 0) {
      return toast.error("images is Required");
    }

    if (Object.keys(updateData).length > 0 && images.length === 0) {
      data.existingImages = JSON.stringify(existingImages);
      data.sizes = JSON.stringify(sizes);
      data.userId = user._id;
    }

    if (
      Object.keys(updateData).length > 0 &&
      existingImages?.some((images) => images.startsWith("blob:"))
    ) {
      formData.append("existingImages", JSON.stringify([]));
    } else {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("currency", data.currency);
    formData.append("userId", user.id);

    if (Object.keys(updateData).length > 0) {
      if (images.length === 0) {
        await dispatch(updateProductThunk({ id: updateData._id, data: data }));
        await dispatch(updateDataFnc({}));
        navigate("/product/your-product");
      } else {
        await dispatch(
          updateProductThunk({ id: updateData._id, data: formData }),
        );
        await dispatch(updateDataFnc({}));
        navigate("/product/your-product");
      }
    } else {
      await dispatch(createProductThunk(formData));
      await dispatch(updateDataFnc({}));
      navigate("/product/your-product");
    }
  };

  const onError = (errors) => {
    const error = Object.keys(errors)[0];
    toast.error(errors[error].message);
  };

  return {
    register,
    handleSubmit,
    errors,
    handleClick,
    onError,
    setSizes,
    sizes,
    setImages,
    images,
    isLoading,
    existingImages,
    setExistingImages,
  };
};

export default useProduct;
