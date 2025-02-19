import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-6 text-center">
            {/* Error Icon */}
            <div className="mb-8">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-6xl font-bold text-red-800 mb-4">
                404
            </h1>
            <h2 className="text-4xl font-semibold text-green-700 mb-6">
                Oops! Page Not Found
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry, you can always go back to the homepage and start over.
            </p>

            {/* Back to Home Button */}
            <Link to="/">
                <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 transition duration-300">
                    Go Back to Home
                </button>
            </Link>
        </div>
    );
};

export default ErrorPage;