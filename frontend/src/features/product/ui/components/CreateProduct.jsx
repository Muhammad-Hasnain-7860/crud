import { useNavigate } from "react-router";

import useProduct from "../../hooks/useProduct";
import { useDispatch } from "react-redux";
import { updateDataFnc } from "../../states/ProductStates";

const CreateProduct = () => {
  const Sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const navigate = useNavigate();

  const {
    register,
    handleClick,
    handleSubmit,
    onError,
    setSizes,
    sizes,
    setImages,
    isLoading,
    existingImages,
    setExistingImages,
  } = useProduct();

  const dispatch = useDispatch()

  return (
    <main className="min-h-screen bg-[#080808] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <header className="mb-6 flex items-end justify-between border-b border-white/15 pb-5">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-white/45">
              New Inventory
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
              Create Product<span className="text-white/35">.</span>
            </h1>
          </div>

          <button
            onClick={() => {
              navigate('/')
              dispatch(updateDataFnc({}))
            }}
            type="button"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <span>←</span>
            Back
          </button>
        </header>

        <form
          onSubmit={handleSubmit(handleClick, onError)}
          className="grid grid-cols-1 gap-3 lg:grid-cols-[1.45fr_0.85fr]"
        >
          {/* LEFT */}

          <section className="border border-white/15 bg-[#151515] p-5 shadow-2xl shadow-black/30 sm:p-7">
            {/* Product Info */}

            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/40">
                  01 / Product
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Product information
                </h2>
              </div>

              <span className="text-[8px] font-semibold uppercase tracking-widest text-white/35">
                Required
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">
              {/* Title */}

              <div className="col-span-2">
                <label className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  Product name
                </label>

                <input
                  {...register("title", {
                    required: "Title is Required",
                    minLength: {
                      value: 2,
                      message: "title minium 2 character are Required",
                    },
                    maxLength: {
                      value: 100,
                      message: "Maximum 100 character long",
                    },
                    pattern: {
                      value: /^[A-Za-z ]+$/,
                      message: "Only letters and spaces are allowed",
                    },
                  })}
                  type="text"
                  placeholder="e.g. Essential Heavy Hoodie"
                  className="w-full rounded-sm border border-white/15 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-white/50 focus:bg-[#101010]"
                />
              </div>

              {/* Description */}

              <div className="col-span-2">
                <label className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  Description
                </label>

                <textarea
                  {...register("description", {
                    required: "Description is Required",
                    minLength: {
                      value: 10,
                      message: "description minimum 10 character are Required",
                    },
                    maxLength: {
                      value: 500,
                      value: "description 500 character maximum long",
                    },
                  })}
                  rows="4"
                  placeholder="Write a short description about this product..."
                  className="w-full resize-none rounded-sm border border-white/15 bg-[#0b0b0b] px-4 py-3 text-xs leading-5 text-white outline-none placeholder:text-white/30 transition focus:border-white/50 focus:bg-[#101010]"
                />
              </div>
            </div>

            {/* Variants */}

            <div className="mt-7 border-t border-white/15 pt-6">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/40">
                    02 / Variants
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Size inventory
                  </h2>
                </div>

                <span className="text-[8px] text-white/35">
                  Price & stock per size
                </span>
              </div>

              {/* Variant Header */}

              <div className="mb-2 grid grid-cols-[70px_1fr_1fr] gap-3 rounded-sm bg-[#0b0b0b] px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/40">
                <span>Size</span>

                <span>Price</span>

                <span>Stock</span>
              </div>

              {/* Variant Rows */}

              <div className="space-y-2">
                {Sizes.map((size, index) => {
                  const foundSize = sizes.find((s) => {
                    return s.size === size;
                  });
                  return (
                    <div
                      key={size}
                      className="group grid grid-cols-[70px_1fr_1fr] items-center gap-3 rounded-sm border border-white/10 bg-[#0d0d0d] px-3 py-2.5 transition hover:border-white/25 hover:bg-[#111111]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] text-white/30">
                          0{index + 1}
                        </span>

                        <span className="text-xs font-semibold text-white">
                          {size}
                        </span>
                      </div>

                      <div className="flex items-center border-b border-white/20 transition group-hover:border-white/40">
                        <input
                          onChange={(e) => {
                            if (!foundSize) {
                              sizes.push({ size });
                            }

                            const arr = sizes.map((s) => {
                              return s.size === size
                                ? { ...s, price: e.target.value }
                                : s;
                            });

                            setSizes(arr);
                          }}
                          value={foundSize ? foundSize.price : ""}
                          type="number"
                          placeholder="0"
                          className="w-full bg-transparent px-2 py-1.5 text-xs text-white outline-none placeholder:text-white/30"
                        />
                      </div>

                      <div className="flex items-center border-b border-white/20 transition group-hover:border-white/40">
                        <input
                          onChange={(e) => {
                            if (!foundSize) {
                              sizes.push({ size });
                            }

                            const arr = sizes.map((s) => {
                              return s.size === size
                                ? { ...s, stock: e.target.value }
                                : s;
                            });

                            setSizes(arr);
                          }}
                          value={foundSize ? foundSize.stock : ""}
                          type="text"
                          placeholder="0"
                          className="w-full bg-transparent py-1.5 text-xs text-white outline-none placeholder:text-white/30"
                        />

                        <span className="text-[8px] text-white/30">units</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RIGHT */}

          <aside className="flex flex-col gap-3">
            {/* Pricing */}

            <section className="border border-white/15 bg-[#151515] p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/40">
                    03 / Currency
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-white">
                    Pricing setup
                  </h2>
                </div>

                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0b0b0b] text-sm text-white/60">
                  $
                </span>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-[8px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  Currency
                </label>

                <select
                  defaultValue={"PKR"}
                  {...register("currency", {
                    required: "Currency is Required",
                  })}
                  className="w-full rounded-sm border border-white/15 bg-[#0b0b0b] px-4 py-3 text-xs text-white outline-none transition focus:border-white/50"
                >
                  <option value={"PKR"}>PKR — Pakistani Rupee</option>

                  <option value={"USD"}>USD — US Dollar</option>

                  <option value={"EUR"}>EUR — Euro</option>
                </select>
              </div>

              <p className="mt-4 max-w-xs text-[9px] leading-4 text-white/30">
                Currency will be applied to every size variant of this product.
              </p>
            </section>

            {/* Images */}

            <section className="relative flex min-h-[320px] flex-1 flex-col border border-white/15 bg-[#151515] p-5 shadow-2xl shadow-black/30 sm:p-7">
              {existingImages.length > 0 && (
                <button
                  onClick={() => {
                    setExistingImages([]);
                  }}
                  type="button"
                  className="absolute right-4 top-4 flex text-xl h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/50 transition hover:border-white/25 hover:bg-white/[0.08] hover:text-red-600"
                >
                  ×
                </button>
              )}

              <div className="shrink-0">
                <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/40">
                  04 / Media
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Product images
                </h2>
              </div>

              <label className="group mt-5 flex min-h-[220px] flex-1 cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-white/20 bg-[#0b0b0b] px-5 text-center transition hover:border-white/40 hover:bg-[rgb(16,16,16)]">
                {existingImages?.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {existingImages.map((image, index) => (
                      <div
                        key={index}
                        className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-white/30"
                      >
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <label className="mt-4 flex cursor-pointer flex-col items-center gap-2">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      Update images
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-2xl font-light text-white/50 transition hover:border-white/30 hover:text-white">
                      +
                    </div>

                    <span className="text-[8px] text-white/30">
                      PNG / JPG / WEBP
                    </span>

                    <input
                      onChange={(e) => {
                        setImages(e.target.files);

                        const urls = []

                        for(let i = 0;i<e.target.files.length;i++){
                         const url = URL.createObjectURL(e.target.files[i])
                         urls.push(url)
                        }

                        setExistingImages([...urls])
                      }}
                      type="file"
                      multiple
                      className="hidden"
                    />
                  </label>
                )}
              </label>
            </section>
          </aside>

          {/* Submit */}

          <div className="lg:col-span-2">
            {isLoading ? (
              <button
                type="button"
                disabled
                className="flex w-full items-center justify-between border border-white/20 bg-white/75 px-5 py-4 text-black"
              >
                <div>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em]">
                    Creating Product...
                  </span>

                  <span className="mt-0.5 block text-[8px] text-black/50">
                    Please wait while your product is being created
                  </span>
                </div>

                <span className="text-sm font-bold">...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="group flex w-full items-center justify-between border border-white bg-white px-5 py-4 text-black transition hover:bg-white/90"
              >
                <div>
                  <span
                    type="submit"
                    className="block text-[9px] font-bold uppercase tracking-[0.22em]"
                  >
                    Create Product
                  </span>

                  <span className="mt-0.5 block text-[8px] text-black/50">
                    Add this product to your inventory
                  </span>
                </div>

                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateProduct;
