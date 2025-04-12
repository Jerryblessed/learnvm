// src/app/about/page.js

import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center p-10">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-white mb-4">About Us</h1>
        <p className="text-lg text-gray-300 mb-8">
          Our LMS platform leverages cutting-edge WebVM CheerpX and a robust Linux environment to bring you interactive Python lessons.
          Whether you're starting from scratch or advancing your skills, our modules guide you with hands-on coding and real-time feedback.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
