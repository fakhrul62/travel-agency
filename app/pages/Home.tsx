import React from "react";
import { Link } from "react-router";

const Home: React.FC = () => {
  return (
    <section className="text-gray-700 bg-white body-font min-h-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            to="/"
          >
            <img
              src="/assets/icons/logo.svg"
              alt="ToureChol Logo"
              className="w-10 h-10 p-1 bg-indigo-500 rounded-full"
            />
            <span className="ml-3 text-2xl font-bold tracking-tight">
              ToureChol
            </span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-200 flex flex-wrap items-center text-base justify-center">
            <Link
              className="mr-5 hover:text-indigo-600 transition-colors"
              to="/"
            >
              Home
            </Link>
            <Link
              className="mr-5 hover:text-indigo-600 transition-colors"
              to="/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className="mr-5 hover:text-indigo-600 transition-colors"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </nav>
          <Link
            to="/sign-in"
            className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0 text-white font-semibold transition-colors"
          >
            Get Started
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center flex-1 h-full">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-gray-900">
            Discover Your Next Adventure with ToureChol
          </h1>
          <p className="mb-8 leading-relaxed text-gray-700 text-lg max-w-xl">
            Plan, book, and experience unforgettable journeys with ToureChol.
            Explore curated trips, connect with travel experts, and make memories
            that last a lifetime.
          </p>
          <div className="flex justify-center">
            <Link
              to="/sign-up"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="ml-4 inline-flex text-indigo-600 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 hover:text-indigo-800 rounded text-lg font-semibold transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded shadow-xl"
            alt="Travel Hero"
            src="/assets/images/hero-img.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
