
//     return (
//         <div className="bg-gray-50 py-12 px-6 md:px-20">
//             <div className="text-center mb-8">
//                 <h2 className="text-4xl font-bold text-green-700">About Us</h2>
//                 <p className="text-gray-600 text-lg mt-4">
//                     Bringing pets and loving families together, one adoption at a time.
//                 </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Section: Our Mission */}
//                 <div className="bg-white p-6 shadow-lg rounded-lg">
//                     <h3 className="text-2xl font-semibold text-green-700 mb-4">Our Mission</h3>
//                     <p className="text-gray-700 text-lg">
//                         We are dedicated to creating a user-friendly platform where individuals can connect with pets in need of loving homes. Our goal is to reduce the number of pets in shelters by making the adoption process easier and more accessible.
//                     </p>
//                 </div>

import { Link } from "react-router-dom";

//                 {/* Section: How the Platform Works */}
//                 <div className="bg-white p-6 shadow-lg rounded-lg">
//                     <h3 className="text-2xl font-semibold text-green-700 mb-4">How It Works</h3>
//                     <ul className="list-disc list-inside text-gray-700 text-lg space-y-3">
//                         <li>Browse available pets by category, age, or location.</li>
//                         <li>Read detailed profiles to find your perfect match.</li>
//                         <li>Submit an adoption request to connect with pet owners.</li>
//                         <li>Give a pet a forever home and transform their life—and yours!</li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="mt-12 text-center">
//                 <p className="text-gray-700 text-lg">
//                     Join us in our mission to unite pets with their forever families. Together, we can make a difference.
//                 </p>
//                 <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-800 transition duration-300 mt-6">
//                     Start Your Journey
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default AboutUs;
const AboutUs = () => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-green-100 py-16 px-6 md:px-20">
            <div className="text-center mb-12">
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
            <div className="mt-16 text-center">
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

