"use client"
import { cartContext } from '@/global/context';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImGoogle } from 'react-icons/im';

const notificationError = (title: string) => {
  toast(title, {
    position: "top-right"
  })
};

const SignInForm = () => {
  let { signUpViaGoogle, userData, signInUser, loading, errorsOfFirebase } = useContext(cartContext)
  const [formData, setFormData] = useState({ email: '', password: '' });


  useEffect(() => {
    if (userData) {
      window.location.href = "/"
    }
    if (errorsOfFirebase.errorMessage.length > 0) {
      notificationError(errorsOfFirebase.errorMessage)
    };
  }, [userData, errorsOfFirebase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = () => {
    const { email, password } = formData;
    signInUser(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Toaster />
      <div className="max-w-md w-full bg-gra-100 p-8 shadow-lg border-t-8 rounded-xl border-gray-700">
        <h2 className="text-2xl mb-4 text-gray-700 font-bold">Sign In</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-purple-200 rounded-md px-3 py-2 w-full"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-purple-200 rounded-md px-3 py-2 w-full"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center py-3">
          <button
            className="border flex gap-2 items-center justify-center bg-purple-100 hover:bg-purple-200 text-gray-700 font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={signUpViaGoogle}
          >
            <ImGoogle size={25} fill="#ced70c" />
            SignIn With Google
          </button>
        </div>
        <button
          disabled={loading}
          className="bg-purple-700 text-white rounded-md py-2 px-4 font-medium"
          onClick={handleSignIn}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
