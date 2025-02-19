import { Link } from "react-router-dom";

const PetCareTips = () => {
    return (
        <div className="bg-green-100 dark:bg-gray-700 py-20 px-6 md:px-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-green-800 dark:text-green-400 mb-6">
                    Pet Care Tips
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Caring for your pet is a lifelong responsibility. Here are some tips to make sure your new furry friend is happy and healthy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Tip 1 */}
                <div className="bg-white dark:bg-gray-800 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-700 hover:shadow-2xl transform transition-transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Nutrition & Diet
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Provide your pet with a balanced diet that meets their nutritional needs. Consult with a vet for the best options.
                    </p>
                </div>

                {/* Tip 2 */}
                <div className="bg-white dark:bg-gray-800 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-700 hover:shadow-2xl transform transition-transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Regular Exercise
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Exercise is essential for your pet’s physical and mental health. Regular walks, playtime, and activities keep them happy.
                    </p>
                </div>

                {/* Tip 3 */}
                <div className="bg-white dark:bg-gray-800 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-700 hover:shadow-2xl transform transition-transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Grooming & Hygiene
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Regular grooming helps maintain your pet’s health and hygiene. Brushing fur, trimming nails, and cleaning ears are essential.
                    </p>
                </div>

                {/* Tip 4 */}
                <div className="bg-white dark:bg-gray-800 p-10 shadow-xl rounded-xl border border-green-200 dark:border-gray-700 hover:shadow-2xl transform transition-transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                        Vet Visits
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Regular vet visits are crucial to keeping your pet healthy. Vaccinations and check-ups should be part of the routine.
                    </p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Link to='/petCareGuide'>
                    <button className="bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 dark:hover:bg-green-600 transition duration-300 mt-8">
                        Learn More Pet Care Tips
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PetCareTips;
