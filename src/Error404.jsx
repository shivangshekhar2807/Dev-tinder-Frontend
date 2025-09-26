import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Big 404 text */}
      <h1 className="text-9xl font-bold text-primary">404</h1>

      {/* Error message */}
      <p className="text-2xl md:text-3xl font-semibold mt-4 text-base-content">
        Oops! Page not found
      </p>
      <p className="mt-2 text-base-content/70">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Go home button */}
      <Link to="/" className="btn btn-primary mt-6">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
