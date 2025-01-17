import img3 from '../../../assets/CallToAction/cat.avif';
import img2 from '../../../assets/CallToAction/dg.jpg';
import img1 from '../../../assets/CallToAction/bird.jpg';
import img4 from '../../../assets/CallToAction/rabbit.jpg';

const CallToAction = () => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-green-100 py-12 px-6 md:px-20 p-4">
            <div className="flex flex-col md:flex-row items-center md:justify-between gap-8">
                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left bg-green-200 p-8 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">
                        Make a Difference – Adopt a Pet Today!
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                        Millions of loving pets are waiting for someone to bring them into their forever homes.
                        By adopting, you’re not just saving a life; you’re gaining a loyal companion for yours.
                    </p>
                    <button className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-800 transition duration-300">
                        Find Your New Friend
                    </button>
                </div>

                {/* Image Section */}
                <div className="grid grid-cols-5 grid-rows-3 gap-2 w-full md:w-1/2">
                    <div className="col-span-3 row-span-1">
                        <img
                            src={img1}
                            alt="Image 1"
                            className="w-full h-full object-cover rounded-full rounded-br-none shadow-lg"
                        />
                    </div>
                    <div className="col-span-2 row-span-2">
                        <img
                            src={img2}
                            alt="Image 2"
                            className="w-full h-full object-cover rounded-full rounded-bl-none shadow-lg"
                        />
                    </div>
                    <div className="col-span-2 row-span-2">
                        <img
                            src={img3}
                            alt="Image 3"
                            className="w-full h-full object-cover rounded-full rounded-tr-none shadow-lg"
                        />
                    </div>
                    <div className="col-span-3 row-span-1">
                        <img
                            src={img4}
                            alt="Image 4"
                            className="w-full h-full object-cover rounded-full rounded-tl-none shadow-lg"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CallToAction;
