import "@/styles/globals.css";
import Link from "next/dist/client/link";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import {  getSession, signIn } from "next-auth/react";




const Login: React.FC = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
   const result = await signIn("credentials", {
      email: userInfo.email,
      password : userInfo.password,
      
      redirect: false,
    }); 

    if (result && result.error === null) {
      const session = await getSession();
      if (session?.user !== null) {
        router.push("/dashboard");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>
            <div className="text-center text-gray-500 mb-4">
              For your protection, please verify your identity.
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
                name="email"
                required
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
              />
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="password"
                >
                  Password <span className="text-red-600">*</span>
                </label>
                <a href="#/" className="text-right text-gray-500 text-sm">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
                name="password"
                required
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  id="customCheck1"
                />
                <span className="text-sm">Remember me</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mb-3"
            >
              Sign In
            </button>
            <div className="text-center text-gray-500 text-sm">
              Don't have an account yet?
              <Link href="/pages/register">Sign up</Link>.
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;


