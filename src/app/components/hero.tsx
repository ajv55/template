'use client';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="bg-indigo-500 text-white h-screen flex flex-col justify-center items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-4"
      >
        Welcome to MySite
      </motion.h1>
      <p className="text-xl mb-8">Your gateway to amazing services and products.</p>
      <a
        href="#contact"
        className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Contact Us
      </a>
    </section>
  );
};

export default HeroSection;
