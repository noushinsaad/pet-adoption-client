import { Carousel } from "flowbite-react";
import banner01 from "../../../assets/Banner/banner.webp";
import banner02 from "../../../assets/Banner/banner02.jpg";
import banner03 from "../../../assets/Banner/banner03.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="h-[500px]">
            <Carousel pauseOnHover>
                {/* First Slide - Updated styling */}
                <div className="relative h-full">
                    <img
                        className="object-cover w-full h-full"
                        src={banner01}
                        alt="Adopt your best friend"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-gray-900/60 to-zinc-800/60 text-center px-4">
                        <h2 className="text-4xl font-black mb-4 text-white drop-shadow-md">
                            <span className="text-amber-400">Adopt</span> Your Best Friend
                        </h2>
                        <p className="text-lg text-gray-100 max-w-2xl leading-relaxed">
                            Find your perfect companion today! Adopt a loyal friend and give them
                            <span className="block mt-2 font-semibold text-amber-300">
                                a forever home.
                            </span>
                        </p>
                    </div>
                </div>

                {/* Second Slide - Updated styling */}
                <div className="relative h-full">
                    <img
                        className="object-cover w-full h-full"
                        src={banner02}
                        alt="Discover a new family member"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900/70 to-stone-800/50 text-center px-4">
                        <h2 className="text-4xl font-black mb-4 text-white">
                            Discover a <span className="text-emerald-300">New Family</span> Member
                        </h2>
                        <p className="text-lg text-gray-50 max-w-xl italic">
                            &quot;Every animal deserves love. Find your new furry family member here.&quot;
                        </p>
                        
                    </div>
                </div>

                {/* Third Slide - Updated styling */}
                <div className="relative h-full">
                    <img
                        className="object-contain w-full h-full"
                        src={banner03}
                        alt="Change a life today"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80 text-center px-4">
                        <div className="border-4 border-amber-400 p-8 bg-black/30">
                            <h2 className="text-4xl font-black mb-4 text-amber-300 uppercase tracking-wide">
                                Change a Life Today
                            </h2>
                            <p className="text-lg text-gray-200 max-w-2xl mb-6">
                                Your kindness can bring joy to an animal in need
                            </p>
                            <div className="space-x-4">
                                <Link to='/petListing'>
                                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded">
                                        Start Adoption
                                    </button>
                                </Link>
                                <button
                                    onClick={() => document.getElementById("aboutus").scrollIntoView({ behavior: "smooth" })}
                                    className="border-2 border-amber-400 text-amber-300 hover:bg-amber-400/20 px-6 py-3 rounded"
                                >
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
