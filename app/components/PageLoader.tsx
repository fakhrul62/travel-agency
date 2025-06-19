import React from "react";

const PageLoader: React.FC = () => (
  <div
    className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70"
    style={{ zIndex: 9999 }}
  >
    <span className="loader block w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
    <style>{`
      .loader {
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default PageLoader;
