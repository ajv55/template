'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {

    const {data: session} = useSession();

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">MySite</div>
        <ul className="flex space-x-6">
          <li>
            <Link className="hover:underline" href="/">
               Home
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="#about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="#services">
           Services
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="#contact">
              Contact
            </Link>
          </li>
        </ul>
        {!session ? <Link className='bg-white w-[15%] rounded-xl text-xl font-light tracking-wider border-2 border-indigo-300  text-indigo-600 hover:shadow-md hover:shadow-indigo-500 px-2 py-2 text-center ' href='/login'>Sign-In</Link> : <Link className='bg-white border-2 border-indigo-300  text-indigo-600 hover:shadow-md hover:shadow-indigo-200 w-[15%]  text-xl font-light tracking-wider rounded-xl  text-center px-2.5 py-2.5 ' href='/signOut'>Sign-Out</Link> }
      </div>
    </nav>
  );
};

export default Navbar;
