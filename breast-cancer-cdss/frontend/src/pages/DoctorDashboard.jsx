import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PatientService } from '../services/api';
import { Link } from 'react-router-dom';
import { Users, FileText, Activity, Search, Bell, Calendar, ChevronRight, LogOut, PieChart, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorDashboard = () => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Mock Data (Enhanced)
    const stats = [
        { label: 'Total Patients', value: '248', icon: <Users size={24} className="text-blue-600" />, trend: '+12 this month', color: 'bg-blue-50' },
        { label: 'Accuracy Rate', value: '97.2%', icon: <Activity size={24} className="text-green-600" />, trend: '+0.5% vs avg', color: 'bg-green-50' },
        { label: 'Pending Reviews', value: '18', icon: <FileText size={24} className="text-orange-600" />, trend: '5 urgent', color: 'bg-orange-50' },
    ];

    const recentActivity = [
        { id: 1, text: 'Prediction run for Patient #145', time: '2 hours ago', icon: <Activity size={16} /> },
        { id: 2, text: 'New patient registered: Sarah Connor', time: '5 hours ago', icon: <Users size={16} /> },
        { id: 3, text: 'Medical record updated for ID #0092', time: '1 day ago', icon: <FileText size={16} /> },
    ];

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await PatientService.getAllPatients();
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients", error);
            }
        };
        fetchPatients();
    }, []);

    const formatDoctorName = (name) => {
        let displayName = name;
        if (!displayName && user?.email) {
            displayName = user.email.split('@')[0];
            displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        }

        if (!displayName) return 'Dr. User';

        return displayName.toLowerCase().startsWith('dr.') || displayName.toLowerCase().startsWith('dr ') ? displayName : `Dr. ${displayName}`;
    };

    const filteredPatients = searchQuery
        ? patients.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.id.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-gradient-to-b from-pink-700 to-rose-600 text-white flex-shrink-0 hidden md:block sticky top-0 h-screen shadow-2xl">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10">
                        <Activity className="w-8 h-8 text-pink-200" />
                        <h2 className="text-2xl font-bold font-serif tracking-wide">MedAI<span className="text-pink-200">.</span></h2>
                    </div>

                    <nav className="space-y-2">
                        <NavItem icon={<PieChart size={20} />} label="Overview" active />
                        <NavItem icon={<Users size={20} />} label="My Patients" />
                        <NavItem icon={<Activity size={20} />} label="AI Predictions" />
                        <NavItem icon={<FileText size={20} />} label="Reports" />
                        <NavItem icon={<Calendar size={20} />} label="Schedule" />
                        <div className="pt-8 pb-2">
                            <p className="text-xs uppercase text-pink-200/60 font-bold tracking-wider px-4">Settings</p>
                        </div>
                        <NavItem icon={<Settings size={20} />} label="Configuration" />
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-pink-100 hover:text-white mt-4"
                        >
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 py-4 flex justify-between items-center border-b border-gray-100 shadow-sm">
                    <div className="relative">
                        <div className="flex items-center gap-4 bg-gray-100 rounded-full px-4 py-2 w-96 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search patients by Name or ID..."
                                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {/* Search Dropdown */}
                        {searchQuery && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map(patient => (
                                        <div key={patient.id} className="p-3 hover:bg-pink-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors">
                                            <p className="text-sm font-bold text-gray-800">{patient.name}</p>
                                            <p className="text-xs text-gray-500">ID: {patient.id} • {patient.gender}, {patient.age}yo</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-4 text-sm text-gray-500 text-center">No patients found.</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <div
                            className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all"
                            onClick={() => setShowProfileModal(true)}
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-800">{formatDoctorName(user?.fullName)}</p>
                                <p className="text-xs text-gray-500">{user?.specialization || 'Oncologist'}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 font-bold border-2 border-white shadow-sm">
                                {user?.fullName ? user.fullName.charAt(0) : (user?.email ? user.email.charAt(0).toUpperCase() : 'D')}S
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Welcome Section */}
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">Dashboard Overview</h1>
                            <p className="text-gray-500">Welcome back, {formatDoctorName(user?.fullName)}. You have <span className="text-pink-600 font-semibold">5 new reports</span> to review.</p>
                        </div>
                        <Link to="/prediction" className="btn-primary flex items-center gap-2 shadow-lg shadow-pink-200">
                            <PlusCircleIcon /> New Prediction
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
                                    <span className="text-xs font-medium bg-gray-50 px-2 py-1 rounded text-gray-600">{stat.trend}</span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Activity Feed */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
                                <button className="text-pink-600 text-sm font-semibold hover:underline">View All</button>
                            </div>
                            <div className="space-y-6">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex gap-4 items-start group">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                                            {activity.icon}
                                        </div>
                                        <div className="flex-1 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                                            <p className="text-gray-800 font-medium">{activity.text}</p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-[60px] opacity-20"></div>
                            <h3 className="text-xl font-bold font-serif mb-4 relative z-10">AI Diagnostic Tool</h3>
                            <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                                Run advanced ML predictions using our AdaBoost model with 97% accuracy. Get instant SHAP & LIME explanations.
                            </p>
                            <Link to="/prediction" className="w-full py-3 bg-pink-600 hover:bg-pink-500 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all relative z-10">
                                Launch Tool <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Profile Modal */}
                {showProfileModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-6 text-center relative">
                                <button
                                    onClick={() => setShowProfileModal(false)}
                                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                                <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center text-pink-600 text-2xl font-bold shadow-lg mb-3">
                                    {user?.fullName ? user.fullName.charAt(0) : (user?.email ? user.email.charAt(0).toUpperCase() : 'D')}S
                                </div>
                                <h3 className="text-xl font-bold text-white">{formatDoctorName(user?.fullName)}</h3>
                                <p className="text-pink-100 text-sm">Targeted {user?.specialization || 'Oncologist'}</p>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 text-sm">Email</span>
                                    <span className="text-gray-800 font-medium text-sm">{user?.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 text-sm">License ID</span>
                                    <span className="text-gray-800 font-medium text-sm">{user?.medicalLicense || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 text-sm">Department</span>
                                    <span className="text-gray-800 font-medium text-sm">{user?.specialization || 'Oncology'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Joined</span>
                                    <span className="text-gray-800 font-medium text-sm">{user?.joinedDate || 'Jan 2024'}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/10 text-white font-medium shadow-inner' : 'text-pink-100 hover:bg-white/5 hover:text-white'}`}>
        {icon}
        <span className="text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-300"></div>}
    </div>
);

// Helper Icon
const PlusCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
);

export default DoctorDashboard;
