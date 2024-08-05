'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Page() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const userName = session?.user?.name;

    useEffect(() => {
        if (!session) {
            router.push('/');
        }
    }, [session, router]);

    const handleClick = () => {
        signOut();
    };

    return (
        <div className={` min-h-screen flex justify-center items-center`}>
            <div className="bg-white w-[23rem] lg:w-[45%] ring-2 ring-indigo-600 xl:w-[45%] rounded-xl p-8 flex flex-col justify-center items-center shadow-2xl">
                <h1 className="text-3xl lg:text-4xl font-extrabold text-center mb-6 tracking-wide text-indigo-800">
                    Are you sure you want to sign out?
                </h1>
                <h6 className="text-lg lg:text-xl mb-8 text-gray-600">
                    Bye, {userName?.toUpperCase()}!
                </h6>
                <button
                    onClick={handleClick}
                    className="w-full lg:w-[85%] py-3 bg-red-500 text-white rounded-lg text-lg lg:text-xl font-semibold hover:bg-red-600 transition-colors mb-4"
                >
                    Sign Out
                </button>
                <Link
                    href='/'
                    className="w-full lg:w-[85%] py-3 bg-indigo-500 text-center text-white rounded-lg text-lg lg:text-xl font-semibold hover:bg-indigo-600 transition-colors"
                >
                    Cancel
                </Link>
            </div>
        </div>
    );
}

