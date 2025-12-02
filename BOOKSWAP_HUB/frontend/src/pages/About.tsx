import Navbar from '../components/Navbar';
import Icon from '../components/AppIcon';

const About = () => {
    const features = [
        {
            icon: 'BookOpen',
            title: 'Facilitate Exchanges',
            description: 'Connect with fellow readers to exchange books instead of buying new ones, making reading more accessible and affordable.',
            gradient: 'from-primary to-primary/70'
        },
        {
            icon: 'Users',
            title: 'Build Community',
            description: 'Join a vibrant community of book lovers, share recommendations, and discover new reads through meaningful connections.',
            gradient: 'from-amber-600 to-orange-600'
        },
        {
            icon: 'TrendingUp',
            title: 'Save Money',
            description: 'Save hundreds of dollars by exchanging books instead of purchasing. Get the books you want without breaking the bank.',
            gradient: 'from-teal-600 to-emerald-600'
        },
        {
            icon: 'Sparkles',
            title: 'Discover Hidden Gems',
            description: 'Find rare, out-of-print, and unique books that you won\'t see in regular bookstores. Every exchange is a treasure hunt!',
            gradient: 'from-slate-600 to-gray-700'
        }
    ];

    const values = [
        {
            title: 'Sustainability',
            description: 'We\'re committed to reducing waste and environmental impact through book reuse and circular economy principles.',
            icon: 'Leaf'
        },
        {
            title: 'Accessibility',
            description: 'Everyone deserves access to quality reading materials. We make books affordable and available to all.',
            icon: 'Globe'
        },
        {
            title: 'Community',
            description: 'We believe in the power of local communities helping each other grow through shared knowledge and stories.',
            icon: 'Heart'
        },
        {
            title: 'Trust & Safety',
            description: 'We prioritize creating a safe, transparent, and trustworthy platform for all our users.',
            icon: 'Shield'
        }
    ];

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Navbar />

            {/* Hero Section - Split Layout to Reduce Empty Space */}
            <section className="relative bg-stone-50 py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
                                <Icon name="Info" size={16} className="text-primary" />
                                <span className="text-sm font-medium text-gray-800">Our Story & Mission</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                We're Changing How <br />
                                <span className="text-primary font-pacifico">The World Reads</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                BookSwap Hub is more than just a platform; it's a movement. We're building a global community where stories travel freely and every book finds a new home.
                            </p>

                            {/* Stats Row */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                                <div>
                                    <div className="text-3xl font-bold text-primary">50K+</div>
                                    <div className="text-sm text-gray-600">Books Shared</div>
                                </div>
                                <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                                <div>
                                    <div className="text-3xl font-bold text-amber-600">15K+</div>
                                    <div className="text-sm text-gray-600">Happy Readers</div>
                                </div>
                                <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                                <div>
                                    <div className="text-3xl font-bold text-teal-600">100+</div>
                                    <div className="text-sm text-gray-600">Cities</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                                <img
                                    src="https://images.pexels.com/photos/5730110/pexels-photo-5730110.jpeg?auto=compress&cs=tinysrgb&w=800"
                                    alt="Open book on white sheets"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="font-medium text-lg">"Reading brings us together"</p>
                                </div>
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-30"></div>
                            <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-30"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section with Gradient Card */}
            <section className="py-20 bg-white relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="text-primary font-semibold">Our Mission</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-6">
                            Revolutionizing How <span className="text-primary">Books Travel</span>
                        </h2>
                    </div>

                    <div className="relative bg-gradient-to-br from-primary/5 via-amber-50 to-orange-50 p-12 rounded-3xl shadow-2xl border border-primary/10">
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-20 blur-2xl"></div>

                        <p className="text-xl text-gray-700 leading-relaxed text-center relative z-10">
                            We're on a mission to make every book count. BookSwap Hub transforms the way people access, share, and discover books.
                            By connecting passionate readers, we're building a world where knowledge flows freely, costs drop dramatically,
                            and every book gets the love it deserves. Join us in creating a reading revolution! 📖✨
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do Section with Gradient Cards */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="text-primary font-semibold">What We Do</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Your Gateway to <span className="text-primary">Endless Stories</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Four powerful ways we're transforming the book-sharing experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                {/* Icon with Gradient Background */}
                                <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-lg`}>
                                    <Icon name={feature.icon} size={36} color="white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section with Timeline Feel */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30"></div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="text-primary font-semibold">Our Story</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            From Dorm Room to <span className="text-primary">Dream Platform</span>
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary to-gray-900 p-12 rounded-3xl shadow-2xl text-white">
                            <div className="space-y-6">
                                <p className="text-xl leading-relaxed">
                                    🎓 It all started with a simple frustration: textbooks were too expensive, and perfectly good books
                                    were being thrown away after each semester. A group of college students decided to change that.
                                </p>
                                <p className="text-xl leading-relaxed">
                                    💡 What began as a shared spreadsheet among friends quickly evolved into something bigger.
                                    We realized we weren't just solving a problem—we were building a community.
                                </p>
                                <p className="text-xl leading-relaxed">
                                    🚀 Today, BookSwap Hub serves thousands of readers across the country, facilitating meaningful
                                    connections and making books accessible to everyone. Every exchange tells a story, and we're
                                    proud to be part of yours!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section with Icon Cards */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                            <span className="text-primary font-semibold">Our Values</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            What Drives <span className="text-primary">Everything We Do</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-l-4 border-primary hover:border-l-8"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-teal-700 rounded-xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                                            <Icon name={value.icon} size={28} color="white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                            {value.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section - Replaces Old CTA */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-primary rounded-3xl p-12 md:p-16 relative overflow-hidden text-center">
                        {/* Background Decoration */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute left-0 bottom-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <Icon name="Mail" size={48} className="text-amber-400 mx-auto mb-6" />
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Stay in the Loop
                            </h2>
                            <p className="text-xl text-primary-foreground/90 mb-10">
                                Join our newsletter to get the latest updates on book meets, new features, and reading recommendations.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                                />
                                <button className="px-8 py-4 bg-amber-400 text-primary font-bold rounded-xl hover:bg-amber-300 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-sm text-primary-foreground/60 mt-6">
                                No spam, just good stories. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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

export default About;
