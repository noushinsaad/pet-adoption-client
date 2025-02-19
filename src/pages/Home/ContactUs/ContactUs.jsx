import { Button, Label, TextInput, Textarea } from "flowbite-react";

const ContactUs = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Your message has been sent! We will get back to you soon.");
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-6 md:px-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-400">
                    Contact Us
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                    Have questions, suggestions, or just want to say hello? Get in touch with us, and we&apos;ll
                    respond as soon as possible!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information Section */}
                <div className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-xl border border-blue-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">Get in Touch</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                        Whether you have a question about our services, need support, or want to give feedback, we are here to help.
                    </p>
                    <ul className="text-gray-700 dark:text-gray-300 text-lg space-y-3">
                        <li><strong>Address:</strong> 123 Pet Lane, FurEver</li>
                        <li><strong>Email:</strong> <a className="text-cyan-600 dark:text-cyan-400 hover:underline">support@fureverhome.com</a></li>
                        <li><strong>Phone:</strong> <a className="text-cyan-600 dark:text-cyan-400 hover:underline">+1 234 567 890</a></li>
                        <li><strong>Hours:</strong> Mon-Fri: 9 AM - 6 PM</li>
                    </ul>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white dark:bg-gray-800 p-8 shadow-xl rounded-xl border border-blue-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">Send Us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name" value="Your Name" className="dark:text-gray-300" />
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                required
                                shadow
                                className="mt-2 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" value="Your Email" className="dark:text-gray-300" />
                            <TextInput
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                required
                                shadow
                                className="mt-2 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <Label htmlFor="message" value="Your Message" className="dark:text-gray-300" />
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                rows={4}
                                required
                                shadow
                                className="mt-2 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                            />
                        </div>
                        <Button
                            type="submit"
                            gradientDuoTone="cyanToBlue"
                            className="w-full"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    We look forward to hearing from you. Let’s make the world a better place for our furry friends together!
                </p>
                <a>
                    <button className="bg-green-700 dark:bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-green-900 dark:hover:bg-green-600 transition duration-300 mt-8">
                        Email Us Directly
                    </button>
                </a>
            </div>
        </div>
    );
};

export default ContactUs;
