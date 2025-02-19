import { Link } from "react-router-dom";

const WhyAdopt = () => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 py-20 px-6 md:px-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-green-800 dark:text-green-400 mb-6">
                    Why Adopt?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Adoption is not just about finding a pet; it&apos;s about giving them a forever home and making a difference in their lives.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Benefit 1 */}
                <div className="bg-white dark:bg-gray-700 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-600 hover:shadow-2xl transform transition-transform hover:scale-105 text-center">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Save a Life
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Adopting means giving a pet a second chance. Save them from shelters and give them the life they deserve.
                    </p>
                </div>

                {/* Benefit 2 */}
                <div className="bg-white dark:bg-gray-700 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-600 hover:shadow-2xl transform transition-transform hover:scale-105 text-center">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Reduce Overpopulation
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Shelters are overcrowded. Adoption helps reduce this issue and gives pets a new, loving family.
                    </p>
                </div>

                {/* Benefit 3 */}
                <div className="bg-white dark:bg-gray-700 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-600 hover:shadow-2xl transform transition-transform hover:scale-105 text-center">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Get a Loyal Companion
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Pets are not just animals; they are loyal companions who will bring joy, love, and comfort into your life.
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Link to='/petListing'>
                    <button className="bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 dark:hover:bg-green-600 transition duration-300 mt-8">
                        Start Your Adoption Journey
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default WhyAdopt;
