import React, { useState } from 'react';
import { AuthService } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const DoctorSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: '', medicalLicense: '', specialization: '',
        yearsExperience: '', hospitalAffiliation: '', phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            await AuthService.registerDoctor(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen py-10 flex items-center justify-center bg-gradient-to-br from-pink-50 to-white px-4">
            <div className="glass-card p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-2 text-pink-700 text-center">Doctor Registration</h2>
                <p className="text-gray-500 text-center mb-8">Join the network of specialists</p>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                    <Input label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                    <Input label="Medical License ID" name="medicalLicense" value={formData.medicalLicense} onChange={handleChange} required />
                    <Input label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
                    <Input label="Years of Experience" type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} />
                    <Input label="Hospital Affiliation" name="hospitalAffiliation" value={formData.hospitalAffiliation} onChange={handleChange} />
                    <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />

                    <div className="md:col-span-2">
                        <button type="submit" disabled={loading} className="w-full btn-primary py-3 text-lg font-medium shadow-md">
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </div>
                </form>
                <p className="text-center mt-6 text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-pink-600 font-semibold">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

const Input = ({ label, type = "text", ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input type={type} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all" {...props} />
    </div>
);

export default DoctorSignup;
