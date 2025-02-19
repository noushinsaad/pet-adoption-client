import { Link } from "react-router-dom";
import useDarkMode from "../../../hooks/useDarkMode";


const AboutUs = () => {

    const [darkMode] = useDarkMode();  

    return (
        <div id='aboutus' className={`py-16 px-6 md:px-20 space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gradient-to-br from-green-50 to-green-100'}`}>
            <div className="text-center">
                <h2 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-green-800'}`}>
                    About Us
                </h2>
                <p className={`text-lg mt-4 max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    We&apos;re on a mission to bring joy to both pets and humans by connecting loving families with their perfect furry companions.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Our Mission Section */}
                <div className={`p-8 shadow-xl rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-green-200'}`}>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-green-700'} mb-4`}>
                        Our Mission
                    </h3>
                    <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        At our core, we believe every pet deserves a loving home.
                        We strive to simplify the adoption process, reduce shelter populations, and create an easy-to-use platform where individuals can find their ideal companions.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className={`p-8 shadow-xl rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-green-200'}`}>
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-green-700'} mb-4`}>
                        How It Works
                    </h3>
                    <ul className={`list-disc list-inside text-lg space-y-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <li>Explore available pets by browsing categories or using filters like age and location.</li>
                        <li>View detailed pet profiles to find your perfect match.</li>
                        <li>Submit an adoption request to start the process.</li>
                        <li>Welcome your new furry friend into your life and home!</li>
                    </ul>
                </div>
            </div>
            <div className="text-center">
                <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Together, we can make the world a better place—one adoption at a time. Be a hero and give a pet a forever home.
                </p>
                <Link to='/petListing'>
                    <button className={`bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 transition duration-300 mt-8`}>
                        Start Your Adoption Journey
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;
