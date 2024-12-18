"use client";
import { setIsLoggedIn } from "@/features/user/slice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handlerData = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      });
      let responseData = await response.json();
      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        dispatch(setIsLoggedIn(true))
        router.push("/usermanagement");
      } else {
        alert(responseData?.message || "An error occurred");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="block mx-auto h-10 w-auto"
          src="/blue.png"
          alt="Your Company"
          width={150}
          height={100}
        />

        {/* Dark Mode Image */}

        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight dark:text-white">
          Sign In
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={handlerData}>
          <div>
            <label className="block text-sm/6 font-medium">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium">Password</label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-blue-600 hover:text-blue-500"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
