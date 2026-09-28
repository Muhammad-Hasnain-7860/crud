import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../apis/ProductApis.thunk";
import { useNavigate } from "react-router";

const ProductCard = () => {
  const dispatch = useDispatch();

  const { allProducts } = useSelector((store) => store.productSlice);
  const { user } = useSelector((store) => store.authSlice);
  const [firstProduct, setFirstProduct] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await dispatch(getAllProductsThunk());
      setFirstProduct(response.payload.data.products[0]);
    })();
  }, []);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#0b0b0b] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/35">
              Collection
            </span>

            <h1 className="mt-3 text-5xl font-medium tracking-[-0.011em] sm:text-7xl lg:text-8xl">
              Products<span className="text-white/20">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/auth")}
                  className="rounded-full px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/auth/register")}
                  className="rounded-full bg-white px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/80"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/product/create-product")}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Create Product
                </button>

                <button
                  onClick={() => navigate("/product/your-product")}
                  className="rounded-full bg-white px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/80"
                >
                  Update • Delete • Your Products
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
         {firstProduct && <article className="group relative overflow-hidden bg-[#181818] sm:col-span-2">
            <img
              src={firstProduct?.images[0]}
              className="h-[460px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[500px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

            <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
              <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-black">
                New
              </span>

              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-sm backdrop-blur-xl transition hover:bg-white hover:text-black">
                ↗
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <p className="mb-2 text-[9px] uppercase tracking-[0.25em] text-white/50">
                {firstProduct?.title}
              </p>

              <div className="flex items-end justify-between gap-4">
                <h2 className="max-w-sm text-2xl font-medium tracking-[-0.05em] sm:text-3xl">
                  {firstProduct?.description?.slice(0, 20)}...
                </h2>

                <span className="text-sm font-medium">
                  {firstProduct?.sizes[0]?.price?.currency} :{" "}
                  {firstProduct?.sizes[0]?.price?.amount}
                </span>
              </div>

              <button onClick={()=>navigate(`/product/${firstProduct._id}`)} className="mt-5 w-full border border-white/20 bg-white py-3.5 text-xs font-semibold text-black transition hover:bg-transparent hover:text-white">
                View Product
              </button>
            </div>
          </article>} 

        
          {allProducts
            .filter(() => {
              return allProducts.length >= 6;
            })
            .map((product , index) => {
              return (
                <article className="group relative overflow-hidden bg-[#d9d7d1]">
                  <div className="absolute left-5 top-5 z-10">
                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-black/50">
                        {index < 9 ? `0${index + 1}` : index + 1}

                    </span>
                  </div>

                  <img
                    src={product?.images[0]}
                    alt="Relaxed Collection"
                    className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[350px]"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/85 to-transparent p-6 pt-20">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.25em] text-white/50">
                        {product?.title}
                      </p>

                      <h2 className="mt-1 text-xl font-medium tracking-tight">
                        {product?.description?.slice(0, 20)}...
                      </h2>
                    </div>

                    <span className="text-sm">
                      {product?.currency}{' '}
                      {product?.sizes[0]?.price} 
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
                    <button onClick={()=>navigate(`/product/${product._id}`)} className="translate-y-3 border border-white/30 bg-white px-8 py-3 text-xs font-semibold text-black transition-all duration-300 group-hover:translate-y-0 hover:bg-transparent hover:text-white">
                      View Product
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default ProductCard;
