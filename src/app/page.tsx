import Link from 'next/link';
import { FaLinux, FaChalkboardTeacher, FaLaptopCode, FaUserFriends } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center p-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Learn VM</h1>
        <p className="text-lg text-gray-300">
          Learn linux commands through interactive modules powered by WebVM CheerpX and a Linux environment.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-6 mb-10">
        <Link
          href="/lesson"
          className="px-6 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 bg-green-600 rounded-md text-white hover:bg-green-700 transition"
        >
          About Us
        </Link>
      </div>

      {/* Features Icons */}
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <FaLinux size={50} className="text-gray-400" />
          <span className="mt-2 text-white">Linux Environment</span>
        </div>
        <div className="flex flex-col items-center">
          <FaChalkboardTeacher size={50} className="text-gray-400" />
          <span className="mt-2 text-white">Interactive Lessons</span>
        </div>
        <div className="flex flex-col items-center">
          <FaUserFriends size={50} className="text-gray-400" />
          <span className="mt-2 text-white">AI tutors</span>
        </div>
        <div className="flex flex-col items-center">
          <FaLaptopCode size={50} className="text-gray-400" />
          <span className="mt-2 text-white">WebVM CheerpX</span>
        </div>
      </div>
    </div>
  );
}
