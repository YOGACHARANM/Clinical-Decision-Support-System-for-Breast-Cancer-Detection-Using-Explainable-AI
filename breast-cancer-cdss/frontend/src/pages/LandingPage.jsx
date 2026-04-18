import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Users, Heart, ArrowRight, CheckCircle, Play } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="font-sans min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-pink-100/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-pink-100 p-2 rounded-lg">
                            <Activity className="text-pink-600 w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold font-serif text-gray-800 tracking-tight">MedAI</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-pink-600 transition-colors">Features</a>
                        <a href="#about" className="hover:text-pink-600 transition-colors">About</a>
                        <a href="#impact" className="hover:text-pink-600 transition-colors">Impact</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/login/patient"
                            className="text-gray-600 hover:text-pink-600 font-medium px-4 py-2 transition-colors text-sm"
                        >
                            Patient Portal
                        </Link>
                        <Link
                            to="/login/doctor"
                            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-pink-200 text-sm flex items-center gap-2"
                        >
                            Doctor Portal <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-pink-50 via-white to-white opacity-80" />
                    <div className="absolute top-20 right-20 w-96 h-96 bg-pink-200 rounded-full blur-[100px] opacity-30" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 border border-pink-100 rounded-full text-pink-600 text-xs font-bold uppercase tracking-wider"
                            >
                                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" /> Twisted by Oncologists
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-5xl lg:text-7xl font-bold font-serif text-gray-900 leading-[1.1]"
                            >
                                Compassionate <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">AI Precision</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg text-gray-600 max-w-lg leading-relaxed"
                            >
                                Empowering early detection with Explainable AI. We combine compassion with cutting-edge AdaBoost algorithms to provide clear, trustworthy insights.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to="/signup/patient"
                                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-full font-bold shadow-xl shadow-pink-200 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    Get Started <ArrowRight size={18} />
                                </Link>
                                <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                                    <Play size={18} className="fill-current" /> Learn More
                                </button>
                            </motion.div>

                            <div className="pt-8 flex items-center gap-8 text-sm font-medium text-gray-500">
                                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-pink-500" /> 98.5% Accuracy</div>
                                <div className="flex items-center gap-2"><CheckCircle size={16} className="text-pink-500" /> HIPAA Compliant</div>
                            </div>
                        </div>

                        {/* Right Content - The "Card" Look */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative bg-white p-3 rounded-3xl shadow-2xl border border-gray-100 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                {/* Card Image Area */}
                                <div className="bg-gradient-to-br from-pink-600 to-rose-800 rounded-2xl p-8 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-end">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                                    <h3 className="text-3xl font-bold font-serif mb-2 relative z-10">BREAST CANCER</h3>
                                    <div className="text-pink-100 font-medium mb-6 relative z-10 opacity-90">HAS HIGH CURE RATES</div>

                                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 relative z-10">
                                        <p className="text-sm font-medium leading-relaxed">
                                            "Breast cancer has high cure rates when detected and treated early."
                                        </p>
                                    </div>

                                    {/* Abstract Silhouette */}
                                    <div className="absolute top-10 right-10 opacity-20">
                                        <Heart size={120} />
                                    </div>
                                </div>

                                {/* Bottom Stat */}
                                <div className="px-6 py-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">World Health Organization</div>
                                            <div className="text-pink-600 font-bold text-lg">Early Detection Saves Lives</div>
                                        </div>
                                        <Activity className="text-pink-500" size={24} />
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 max-w-xs"
                            >
                                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">AI-Powered Accuracy</div>
                                    <div className="text-xs text-gray-500">Validated by clinical data</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section id="features" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-serif text-gray-900 mb-4">Why Choose MedAI?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Our advanced clinical decision support system brings transparency to medical AI.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Activity className="w-8 h-8 text-pink-500" />, title: "Precision Analysis", desc: "AdaBoost algorithm trained on Wisconsin Diagnostic dataset." },
                            { icon: <Shield className="w-8 h-8 text-blue-500" />, title: "Explainable AI", desc: "SHAP & LIME visualizations to understand every prediction." },
                            { icon: <Users className="w-8 h-8 text-green-500" />, title: "Secure Portal", desc: "Role-based access ensuring HIPAA-compliant data privacy." }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all">
                                <div className="mb-6 bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
