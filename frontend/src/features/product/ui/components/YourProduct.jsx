import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { deleteProduct, yourProductThunk } from "../../apis/ProductApis.thunk";
import { updateAllProduct, updateDataFnc } from "../../states/ProductStates";

const YourProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { yourProduct } = useSelector((store) => store.productSlice);
  useEffect(() => {
    dispatch(yourProductThunk());
  }, []);
  const handleDelete = async (id) => {
    const response = await deleteProduct(id);
    dispatch(updateAllProduct(response.data.product));
  };

  return (
    <main className="min-h-screen bg-[#080808] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-10 flex items-end justify-between border-b border-white/15 pb-6">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
              Inventory
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white">
              Your Products<span className="text-white/35">.</span>
            </h1>

            <p className="mt-2 text-[10px] tracking-[0.04em] text-white/40">
              Manage, update and organize your products.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60 transition hover:border-white hover:text-white"
            >
              ← Back
            </button>

            <button onClick={()=>navigate('/product/create-product')} className="border border-white bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition hover:bg-white/90">
              + Create Product
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Product Card */}

          {yourProduct.map((product) => {
            return (
              <article className="group overflow-hidden rounded-sm border border-white/15 bg-[#151515] shadow-2xl shadow-black/30 transition hover:border-white/25">
                <div className="h-[370px] bg-[#0d0d0d]">
                  <img
                    src={product?.images?.[0]}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-semibold tracking-[-0.02em] text-white">
                        {product?.title}
                      </h2>
                    </div>

                    <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65">
                      {product?.currency}
                    </span>
                  </div>

                  <p className="mb-5 text-[11px] leading-5 tracking-[0.01em] text-white/50">
                    {product?.description}
                  </p>

                  <div className="mb-5 overflow-hidden rounded-sm border-y border-white/15">
                    <div className="grid grid-cols-3 border-b border-white/15 bg-[#0d0d0d] px-3 py-3">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        Size
                      </span>

                      <span className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        Price
                      </span>

                      <span className="text-right text-[8px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        Stock
                      </span>
                    </div>

                    {product?.sizes?.map((p) => {
                      return (
                        <div className="grid grid-cols-3 border-b border-white/[0.08] px-3 py-3 last:border-b-0">
                          <span className="text-[11px] font-medium text-white/85">
                            {p?.size}
                          </span>

                          <span className="text-[11px] font-medium text-white/85">
                            {p?.currency} {p?.price}
                          </span>

                          <span className="text-right text-[11px] font-medium text-white/85">
                            {p?.stock}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={()=>navigate(`/product/${product._id}`)} className="flex-1 border border-white/20 bg-white/[0.03] px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:bg-white/[0.07] hover:text-white">
                      View
                    </button>

                    <button
                      onClick={() => {
                        dispatch(updateDataFnc(product));
                        navigate("/product/create-product");
                      }}
                      className="flex-1 border border-white/20 bg-white/[0.03] px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:border-white/40 hover:bg-white/[0.07] hover:text-white"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => {
                        handleDelete(product._id);
                      }}
                      className="border border-red-500/25 bg-red-500/[0.03] px-3 py-2.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-red-400/75 transition hover:border-red-500/50 hover:bg-red-500/[0.08] hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default YourProduct;
