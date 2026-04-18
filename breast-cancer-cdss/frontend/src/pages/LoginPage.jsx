import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from 'lucide-react';

const LoginPage = ({ role }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // UI Configuration based on role
    const isDoctor = role === 'doctor';
    const title = role ? (isDoctor ? 'Doctor Portal' : 'Patient Portal') : 'Welcome Back';
    const subtitle = role
        ? (isDoctor ? 'Secure access for medical professionals' : 'Access your personal health records')
        : 'Sign in to access your CDSS dashboard';
    const gradient = isDoctor ? 'from-pink-50 to-pink-100' : 'from-pink-50 to-white';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await login(email, password);
            // Optional: Enforce role matching if they try to login to the wrong portal
            if (role && data.role !== (isDoctor ? 'DOCTOR' : 'PATIENT')) {
                setError(`Access Denied. This account is not a ${role}.`);
                return;
            }

            // Redirect based on role
            if (data.role === 'DOCTOR') navigate('/doctor-dashboard');
            else navigate('/patient-dashboard');
        } catch (err) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${gradient} px-4 font-sans`}>
            {/* Back Button */}
            <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors">
                <Layout size={20} className="rotate-180" /> Back to Home
            </Link>

            <div className="glass-card p-8 md:p-12 w-full max-w-md relative overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-pink-600"></div>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-50 text-pink-600 mb-4 shadow-sm">
                        <Layout size={32} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-800 font-serif">{title}</h2>
                    <p className="text-gray-500">{subtitle}</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center justify-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
                            placeholder={isDoctor ? "dr.name@hospital.com" : "your.email@example.com"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center text-gray-500 cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded text-pink-600 focus:ring-pink-500" /> Remember me
                        </label>
                        <a href="#" className="text-pink-600 font-medium hover:text-pink-700 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3.5 text-lg shadow-lg shadow-pink-200/50 mt-2"
                    >
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
                    <p className="mb-3">Don't have an account?</p>
                    {role ? (
                        <Link
                            to={isDoctor ? "/signup/doctor" : "/signup/patient"}
                            className="text-pink-600 font-bold hover:underline"
                        >
                            Sign up as {isDoctor ? 'Doctor' : 'Patient'}
                        </Link>
                    ) : (
                        <div className="flex justify-center gap-4">
                            <Link to="/signup/patient" className="text-pink-600 font-bold hover:underline">Patient Sign up</Link>
                            <span className="text-gray-300">|</span>
                            <Link to="/signup/doctor" className="text-pink-600 font-bold hover:underline">Doctor Sign up</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
