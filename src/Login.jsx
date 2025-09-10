import React from "react";

export default function Login() {
  return (
    <div className="mt-14">
      <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-fit p-8 border-gray-300 border-1 rounded-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-black">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-black/50 sm:text-sm/6 border-1 border-gray-300"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="text-[1em]">
                    <a
                      href="#"
                      className="font-semibold text-black/80 hover:text-black/60"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  focus:outline-black/50 sm:text-sm/6 border-1 border-gray-300"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-lg font-semibold text-white hover:bg-black/70 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-[1em] text-gray-400">
              Not a member?
              <a
                href="#"
                className="font-semibold text-black/80 hover:text-black/60"
              >
                Create an Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
