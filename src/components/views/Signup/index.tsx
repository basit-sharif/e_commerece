"use client"
import { ImGoogle } from "react-icons/im"
import { cartContext } from '@/global/context';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

type SignupFormData = {
    fullName: string;
    email: string;
    password: string;
};


const notificationError = (title: string) => {
    toast(title, {
        position: "top-right"
    })
};

const SignupFormComp = () => {
    let { errorsOfFirebase, signUpUser, userData, signUpViaGoogle, loading, sendEmailVerificationCode } = useContext(cartContext);

    useEffect(() => {
        if (userData) {
            window.location.href = "/"
        }
        if (errorsOfFirebase.errorMessage.length > 0) {
            notificationError(errorsOfFirebase.errorMessage)
        };
    }, [userData, errorsOfFirebase]);


    const [formData, setFormData] = useState<SignupFormData>({
        fullName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    function handleSignupWithGoogle() {
        signUpViaGoogle();
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = () => {
        const { fullName, email, password } = formData;
        const validationErrors: { [key: string]: string } = {};

        // Check for required fields
        if (!fullName) {
            validationErrors.fullName = 'Full Name is required';
        }
        if (!email) {
            validationErrors.email = 'Email is required';
        }
        if (!password || password.length < 6) {
            validationErrors.password = 'Password is required';
        }

        // Check for valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.email = 'Invalid email address';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            signUpUser(formData.email, formData.password)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Toaster />
            <div className="bg-slate-100 shadow-2xl border-t-8 border-pink-700 rounded px-4 md:px-8 pt-6 pb-8">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        className={`appearance-none border border-purple-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? 'border-red-500' : ''
                            }`}
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                        <p className="text-red-500 text-xs italic">{errors.fullName}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`appearance-none border border-purple-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                            }`}
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`appearance-none border border-purple-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                            }`}
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs italic">{errors.password}</p>
                    )}
                </div>
                <div className="flex items-center justify-center py-3">
                    <button
                        className="border flex gap-2 items-center justify-center bg-purple-100 hover:bg-purple-200 text-gray-700 font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignupWithGoogle}
                    >
                        <ImGoogle size={25} fill="#ced70c" />
                        SignUp With Google
                    </button>
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <Link className='text-blue-400 text-sm' href={"/login"}>Already have an account?</Link>
                    <button
                        disabled={loading}
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 md:px-5 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignup}
                    >
                        {loading ? "Loading..." : "Signup"}
                    </button>
                </div>
                {userData && (
                    <div className="mt-3 flex flex-col justify-center items-center">
                        <p>Send Varification Email</p>
                        <button
                            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                            onClick={sendEmailVerificationCode}>
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupFormComp;
