import { useEffect, useState } from "react";

import { getSingleProduct } from "../../apis/ProductApis.thunk";

import { useNavigate, useParams } from "react-router";

const SingleProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await getSingleProduct(id);

      setProduct(response.data.product);
    })();
  }, []);


  return (
    <main className="min-h-screen bg-[#080808] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}

        <div className="mb-6 flex items-end justify-between border-b border-white/15 pb-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
              Collection
            </span>

            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-7xl">
              Product<span className="text-white/35">.</span>
            </h1>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            ← Back
          </button>
        </div>

        <section className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Images */}

          <div className="flex flex-wrap gap-3">
            {product?.images?.map((img, index) => {
              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-sm bg-[#151515] ${
                    product?.images?.length === 1
                      ? "w-full"
                      : "w-[calc(50%-6px)]"
                  }`}
                >
                  <img
                    src={img}
                    alt="Product"
                    className="h-full w-full object-top object-cover transition duration-700 hover:scale-105"
                  />
                </div>
              );
            })}
          </div>

          {/* Details */}

          <div className="border border-white/15 bg-[#151515] p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
              {product?.title}
            </h2>

            {/* Price */}

            <div className="mt-8 border-y border-white/15 py-7">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                Price
              </p>

              <p className="text-3xl font-semibold text-white">
                {product?.currency} {product?.sizes?.[0]?.price}
              </p>
            </div>

            {/* Description */}

            <div className="border-b border-white/15 py-7">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                Description
              </p>

              <p className="text-sm leading-7 text-white/60">
                {product?.description}
              </p>
            </div>

            {/* Sizes */}

            <div className="py-7">
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                Available Sizes
              </p>

              <div className="overflow-hidden rounded-sm border-y border-white/15">
                <div className="grid grid-cols-3 bg-[#0d0d0d] px-3 py-3">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                    Size
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                    Price
                  </span>

                  <span className="text-right text-[9px] font-semibold uppercase tracking-[0.25em] text-white/45">
                    Stock
                  </span>
                </div>

                {product?.sizes?.map((s) => {
                  return (
                    <div
                      key={s?.size}
                      className="grid grid-cols-3 border-t border-white/10 bg-[#111111] px-3 py-4 transition hover:bg-[#151515]"
                    >
                      <span className="text-sm font-medium text-white/90">
                        {s?.size}
                      </span>

                      <span className="text-sm font-medium text-white/80">
                        {product?.currency} {s?.price}
                      </span>

                      <span className="text-right text-sm text-white/65">
                        {s?.stock}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SingleProduct;
