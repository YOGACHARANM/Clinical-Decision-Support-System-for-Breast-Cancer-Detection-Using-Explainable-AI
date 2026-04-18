import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ReportService } from '../services/api';
import { User, Calendar, FileText, Heart } from 'lucide-react';

const PatientDashboard = () => {
    const { user, logout } = useAuth();
    const [latestReport, setLatestReport] = useState(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            if (user?.entityId) {
                try {
                    const response = await ReportService.getPatientReports(user.entityId);
                    if (response.data && response.data.length > 0) {
                        setLatestReport(response.data[0]);
                    }
                } catch (error) {
                    console.error("Error fetching reports", error);
                }
            }
        };
        fetchReport();
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Heart className="text-pink-500 fill-pink-500" />
                    <span className="text-xl font-bold font-heading text-pink-700">MyHealth Portal</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Hello, {user?.fullName || 'Patient'}</span>
                    <button onClick={logout} className="text-sm text-red-500 hover:text-red-700">Log Out</button>
                </div>
            </nav>

            <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12">
                {/* Welcome Banner */}
                <div className="glass-card p-8 bg-gradient-to-r from-pink-50 to-white border border-pink-100 mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-pink-900">My Health Dashboard</h1>
                    <p className="text-gray-600">Track your screenings, view reports, and stay informed.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Quick Stats */}
                    <div className="glass-card p-6 text-center hover:shadow-lg transition-all">
                        <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="text-blue-600" />
                        </div>
                        <h3 className="font-bold text-gray-800">No Appointments</h3>
                        <p className="text-sm text-gray-500 mt-1">Schedule your next checkup</p>
                        <button className="mt-4 text-pink-600 text-sm font-medium hover:underline">Book Now</button>
                    </div>

                    <div className="glass-card p-6 text-center hover:shadow-lg transition-all">
                        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="text-green-600" />
                        </div>
                        <h3 className="font-bold text-gray-800">Latest Report</h3>
                        {latestReport ? (
                            <>
                                <p className="text-sm text-gray-800 font-medium mt-1">{latestReport.predictionResult}</p>
                                <p className="text-xs text-gray-500">{new Date(latestReport.createdAt).toLocaleDateString()}</p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-500 mt-1">No reports found.</p>
                        )}
                        <button className="mt-4 text-pink-600 text-sm font-medium hover:underline">View Details</button>
                    </div>

                    <div className="glass-card p-6 text-center hover:shadow-lg transition-all">
                        <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="text-purple-600" />
                        </div>
                        <h3 className="font-bold text-gray-800">Profile Settings</h3>
                        <p className="text-sm text-gray-500 mt-1">Update contact info</p>
                        <button onClick={() => setShowProfileModal(true)} className="mt-4 text-pink-600 text-sm font-medium hover:underline">Manage</button>
                    </div>
                </div>

                {/* Health Tips */}
                <div className="mt-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Wellness Tips</h3>
                    <div className="bg-white p-6 rounded-xl border border-pink-100 flex gap-4 items-start">
                        <Heart className="text-pink-500 shrink-0" />
                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">Regular Self-Exams</h4>
                            <p className="text-gray-600 text-sm">Performing a monthly breast self-exam helps you know what is normal for you, so you can notice changes early.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setShowProfileModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">×</button>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Profile Settings</h2>
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowProfileModal(false); alert("Profile Updated!"); }}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50" defaultValue={user?.fullName} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50" defaultValue={user?.email} readOnly />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none" rows="3" placeholder="123 Wellness Ave..."></textarea>
                            </div>
                            <button type="submit" className="w-full py-2 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-colors">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
