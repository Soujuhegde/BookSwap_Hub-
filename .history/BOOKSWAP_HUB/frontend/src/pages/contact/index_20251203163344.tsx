import Navbar from '../../components/Navbar';
import Icon from '../../components/AppIcon';

const Contact = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-primary/5 py-20 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                            Contact Us
                        </span>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Have questions about swapping books? Want to share feedback? We'd love to hear from you!
                        </p>
                    </div>
                </section>

                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Icon name="Mail" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                                            <p className="text-gray-600">hello@bookswaphub.com</p>
                                            <p className="text-gray-600">support@bookswaphub.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Icon name="Phone" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                                            <p className="text-gray-600">+91 </p>
                                            <p className="text-gray-500 text-sm">Mon-Fri from 9am to 6pm EST</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                            <Icon name="MapPin" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                                            <p className="text-gray-600">
                                                123 Bookworm Lane<br />
                                                Library District, NY 10001
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                                {/* Background pattern */}
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                                <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

                                <div className="relative">
                                    <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
                                    <p className="mb-6 text-primary-100">
                                        Follow us on social media for the latest updates, book recommendations, and community events.
                                    </p>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm border border-white/10">
                                            <Icon name="Globe" size={20} color="white" />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm border border-white/10">
                                            <Icon name="Twitter" size={20} color="white" />
                                        </a>
                                        <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm border border-white/10">
                                            <Icon name="Linkedin" size={20} color="white" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-primary/30"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <h4 className="text-2xl font-pacifico mb-4 bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                                BookSwap Hub
                            </h4>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Connecting book lovers worldwide through the magic of sharing.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                    <i className="ri-facebook-fill text-xl"></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                    <i className="ri-twitter-fill text-xl"></i>
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                    <i className="ri-instagram-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="font-bold text-lg mb-4">Platform</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="/" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Browse Books</a></li>
                                <li><a href="/signup" className="hover:text-white transition-colors hover:translate-x-1 inline-block">List a Book</a></li>
                                <li><a href="/about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-lg mb-4">Support</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Help Center</a></li>
                                <li><a href="/contact" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Feedback</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-bold text-lg mb-4">Legal</h5>
                            <ul className="space-y-3 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center">
                        <p className="text-gray-400">© 2025 BookSwap Hub. Made with ❤️ for book lovers everywhere.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
