import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { navigate, register, handleSubmit, handleLogin, onError } = useAuth();
  const { isLoading } = useSelector((store) => store.authSlice);


  return (
    <main className="h-screen overflow-hidden bg-[#0b0b0b] px-4 py-4 text-white sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="mx-auto max-w-md border border-white/10 bg-[#181818] p-6 shadow-2xl sm:p-8">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="mb-6 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
            Welcome Back
          </h2>

          <p className="mb-6 mt-1 text-xs uppercase tracking-wider text-white/50">
            Enter your details to continue
          </p>

          <form
            onSubmit={handleSubmit(handleLogin, onError)}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                Email Address
              </label>

              <input
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
                type="email"
                placeholder="NAME@EXAMPLE.COM"
                className="w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 text-xs tracking-wider text-white placeholder-white/20 transition focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
                  Password
                </label>
              </div>

              <input
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 character are Required",
                  },
                })}
                type="password"
                placeholder="••••••••"
                className="w-full border border-white/15 bg-[#0b0b0b] px-4 py-3 text-xs tracking-wider text-white placeholder-white/20 transition focus:border-white focus:outline-none"
              />
            </div>

            {isLoading ? (
              <button
                type="button"
                disabled
                className="mt-5 flex w-full items-center justify-center gap-2 border border-white/20 bg-white/10 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50"
              >
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                Signing In...
              </button>
            ) : (
              <button
                type="submit"
                className="mt-5 w-full border border-white/20 bg-white py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:bg-transparent hover:text-white"
              >
                Sign In
              </button>
            )}
          </form>

          <div
            onClick={() => navigate("/auth/register")}
            className="mt-6 border-t border-white/10 pt-5 text-center"
          >
            <p className="text-[10px] uppercase tracking-wider text-white/50">
              Don't have an account?{" "}
              <span className="text-white underline underline-offset-4 transition hover:text-white/80">
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
