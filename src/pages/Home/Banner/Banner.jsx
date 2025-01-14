import { Carousel } from "flowbite-react";
import banner01 from "../../../assets/banner.webp";
import banner02 from "../../../assets/banner02.jpg";
import banner03 from "../../../assets/banner03.jpg";

const Banner = () => {
    return (
        <div className="h-[500px]">
            <Carousel pauseOnHover>
                {/* First Slide */}
                <div className="relative h-full">
                    <img
                        className="object-cover w-full h-full"
                        src={banner01}
                        alt="Adopt your best friend"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4">
                        <h2 className="text-4xl font-bold mb-4">Adopt Your Best Friend</h2>
                        <p className="text-lg">
                            Find your perfect companion today! Adopt a loyal friend and give them a forever home.
                        </p>
                    </div>
                </div>

                {/* Second Slide */}
                <div className="relative h-full">
                    <img
                        className="object-cover w-full h-full"
                        src={banner02}
                        alt="Discover a new family member"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4">
                        <h2 className="text-4xl font-bold mb-4">Discover a New Family Member</h2>
                        <p className="text-lg">
                            Every animal deserves love. Find your new furry family member here.
                        </p>
                    </div>
                </div>

                {/* Third Slide */}
                <div className="relative h-full">
                    <img
                        className="object-contain w-full h-full"
                        src={banner03}
                        alt="Change a life today"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center px-4">
                        <h2 className="text-4xl font-bold mb-4">Change a Life Today</h2>
                        <p className="text-lg">
                            Your kindness can bring joy to an animal in need. Start your adoption journey now.
                        </p>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
