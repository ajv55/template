'use client';
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import Link from "next/link";
import style from '@/app/style.module.css';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from "next-auth/react";

export default function Register() {
    const { data: session, status } = useSession();
    const ref = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        weightInLbs: '',
        age: '',
        heightInInches: '',
        gender: '',
        agree: false,
        TDEE: '',
        goal: '',
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        ref.current?.reset();
        await axios.post('/api/reg', data)
            .then(() => {
                toast.success('User has been registered successfully!');
                router.push('/login');
            })
            .catch((error) => console.error('Error occurred when trying to register', error))
    };

    return (
        <div className={` min-h-screen flex items-center justify-center bg-gray-100 py-12 px-2 sm:px-6 lg:px-8`}>
            <div className="max-w-3xl w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-4xl lg:text-5xl font-extrabold text-indigo-600">
                        Create Your Account
                    </h2>
                </div>
                <form ref={ref} onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md  w-full flex  flex-wrap p-2 lg:flex-row lg:flex-wrap gap-4 justify-center items-center  ">
                        <div>
                            <label htmlFor="name" className="sr-only">Username</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-32 lg:w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:shadow-md  focus:outline-none focus:ring-indigo-500 focus:shadow-indigo-400 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                autoComplete="email"
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                                placeholder="Email address"
                            />
                        </div>
                        <div className="-mt-px">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                autoComplete="current-password"
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="sr-only">Age</label>
                            <input
                                id="age"
                                name="age"
                                type="text"
                                value={data.age}
                                onChange={(e) => setData({ ...data, age: e.target.value })}
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                                placeholder="Age"
                            />
                        </div>
                        <div>
                            <label htmlFor="weightInLbs" className="sr-only">Weight (lbs)</label>
                            <input
                                id="weightInLbs"
                                name="weightInLbs"
                                type="text"
                                value={data.weightInLbs}
                                onChange={(e) => setData({ ...data, weightInLbs: e.target.value })}
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                                placeholder="Weight (lbs)"
                            />
                        </div>
                        <div>
                            <label htmlFor="heightInInches" className="sr-only">Height (inches)</label>
                            <select
                                id="heightInInches"
                                name="heightInInches"
                                value={data.heightInInches}
                                onChange={(e) => setData({ ...data, heightInInches: e.target.value })}
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                            >
                                <option value="" disabled>Choose height</option>
                                {Array.from({ length: 4 }, (_, i) => i + 4).flatMap(feet =>
                                    Array.from({ length: 12 }, (_, j) => {
                                        const inches = j;
                                        const totalInches = feet * 12 + inches;
                                        return (
                                            <option key={`${feet}-${inches}`} value={totalInches}>{feet}&#39;{inches}&#34; ({totalInches}&#34;)</option>
                                        );
                                    })
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="gender" className="sr-only">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={data.gender}
                                onChange={(e) => setData({ ...data, gender: e.target.value })}
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                            >
                                <option value="" disabled>Choose a gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="TDEE" className="sr-only">Physical Activity</label>
                            <select
                                id="TDEE"
                                name="TDEE"
                                value={data.TDEE}
                                onChange={(e) => setData({ ...data, TDEE: e.target.value })}
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-32 lg:w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                            >
                                <option value="" disabled>Activity</option>
                                <option value="No-Exercise">Little to no exercise and work a desk job</option>
                                <option value="Light-Exercise">Light exercise 1-3 days per week</option>
                                <option value="Moderate-Exercise">Moderate exercise 3-5 days per week</option>
                                <option value="Heavy-Exercise">Heavy exercise 6-7 days per week</option>
                                <option value="Strenuous-Exercise">Strenuous training 2 times a day</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="goal" className="sr-only">Goal Weight</label>
                            <input
                                id="goal"
                                name="goal"
                                type="text"
                                value={data.goal}
                                onChange={(e) => setData({ ...data, goal: e.target.value })}
                                required
                                className="appearance-none focus:shadow-md focus:shadow-indigo-400 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 lg:text-xl text-md"
                                placeholder="Your goal weight..."
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="agree"
                                name="agree"
                                type="checkbox"
                                checked={data.agree}
                                onChange={(e) => setData({ ...data, agree: e.target.checked })}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                                I agree to the <span className="font-medium text-indigo-600">Terms of Service</span> and <span className="font-medium text-indigo-600">Privacy Policy</span>.
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm leading-5">
                            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Already have an account? Sign In
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </button>
                    </div>

                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5">
                            <span className="px-2 bg-gray-100 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => signIn('google')}
                            className="group relative w-full flex justify-center gap-2 items-center py-2 px-4 border border-gray-300 text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FcGoogle size={23} />
                            Sign in with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
