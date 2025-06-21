import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet";
import gsap from "gsap";

const Home: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(
      headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        subtextRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        heroImgRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>ToureChol</title>
        <meta
          name="description"
          content="Welcome to ToureChol - your travel companion."
        />
      </Helmet>
      <section className="bg-white min-h-screen flex flex-col items-center justify-center px-4">
        {/* Navbar */}
        <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-6">
          <Link className="flex items-center gap-2" to="/">
            <img
              src="/assets/icons/logo.svg"
              alt="ToureChol Logo"
              className="w-10 h-10 bg-blue-600 rounded-full p-1 shadow-md"
            />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              ToureChol
            </span>
          </Link>
          <nav className="hidden md:flex gap-8 text-base font-medium">
            <Link
              className="text-gray-500 hover:text-blue-600 transition-colors"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-gray-500 hover:text-blue-600 transition-colors"
              to="/sign-up"
            >
              Sign Up
            </Link>
            <Link
              className="text-gray-500 hover:text-blue-600 transition-colors"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </nav>
          <Link
            to="/sign-up"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors text-base"
          >
            Log in
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </header>
        {/* Hero Section */}
        <main className="w-full max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between flex-1 gap-8 md:gap-0 mt-8 md:mt-0">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Discover Your Next Adventure with{" "}
              <span className="text-blue-600">ToureChol</span>
            </h1>
            <p
              ref={subtextRef}
              className="mb-8 text-gray-600 text-lg max-w-xl"
            >
              Plan, book, and experience unforgettable journeys. Explore curated
              trips, connect with travel experts, and make memories that last a
              lifetime.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                to="/sign-up"
                className="inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 font-semibold px-6 py-2 rounded-lg shadow transition-colors text-lg w-full sm:w-auto"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center border border-zinc-200 text-blue-600 bg-white hover:bg-gray-200 hover:text-blue-800 font-semibold px-6 py-2 rounded-lg transition-colors text-lg w-full sm:w-auto"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              ref={heroImgRef}
              className="object-cover object-center  w-full max-w-md"
              alt="Travel Hero"
              src="/assets/images/hero.svg"
            />
          </div>
        </main>
      </section>
    </>
  );
};

export default Home;
