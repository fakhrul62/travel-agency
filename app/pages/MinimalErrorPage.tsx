import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { Helmet } from "react-helmet";

const MinimalErrorPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { letterSpacing: "0.1em" },
        { letterSpacing: "0.25em", duration: 1.2, ease: "power2.inOut", yoyo: true, repeat: -1 }
      );
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>404 Not Found | ToureChol</title>
        <meta name="description" content="Page not found on ToureChol." />
      </Helmet>
      <div
        ref={containerRef}
        className="min-h-screen w-full flex flex-col items-center justify-center bg-[#222] px-3 sm:px-4"
      >
        <h1
          ref={textRef}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-widest select-none drop-shadow-lg"
          style={{ fontFamily: 'League Gothic, Impact, Arial Narrow, Arial, sans-serif' }}
        >
          404
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-8 text-center max-w-md">
          Sorry, the page you are looking for does not exist or an error has occurred.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default MinimalErrorPage;
