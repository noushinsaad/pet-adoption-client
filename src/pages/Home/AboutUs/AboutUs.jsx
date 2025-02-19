import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <div id='aboutus' className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-6 md:px-20 space-y-4">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-green-800">
                    About Us
                </h2>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                    We&apos;re on a mission to bring joy to both pets and humans by connecting loving families with their perfect furry companions.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Our Mission Section */}
                <div className="bg-white p-8 shadow-xl rounded-xl border border-green-200">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                        Our Mission
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        At our core, we believe every pet deserves a loving home.
                        We strive to simplify the adoption process, reduce shelter populations, and create an easy-to-use platform where individuals can find their ideal companions.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className="bg-white p-8 shadow-xl rounded-xl border border-green-200">
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                        How It Works
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 text-lg space-y-3 leading-relaxed">
                        <li>Explore available pets by browsing categories or using filters like age and location.</li>
                        <li>View detailed pet profiles to find your perfect match.</li>
                        <li>Submit an adoption request to start the process.</li>
                        <li>Welcome your new furry friend into your life and home!</li>
                    </ul>
                </div>
            </div>
            <div className="text-center">
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    Together, we can make the world a better place—one adoption at a time. Be a hero and give a pet a forever home.
                </p>
                <Link to='/petListing'>
                    <button className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 transition duration-300 mt-8">
                        Start Your Adoption Journey
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;

