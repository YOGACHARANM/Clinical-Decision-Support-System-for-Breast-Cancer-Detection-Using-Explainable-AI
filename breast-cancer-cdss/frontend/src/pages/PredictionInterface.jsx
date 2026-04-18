import React, { useState, useEffect } from 'react';
import { MLService, PatientService, ReportService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, CheckCircle, Activity, FileText, ChevronRight, BarChart2, Info, Save, Printer, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FEATURES = [
    { name: 'concave points_worst', label: 'Concave Points (Worst)', min: 0, max: 0.3, step: 0.001 },
    { name: 'texture_mean', label: 'Texture (Mean)', min: 9, max: 40, step: 0.1 },
    { name: 'compactness_se', label: 'Compactness (SE)', min: 0, max: 0.2, step: 0.001 },
    { name: 'perimeter_worst', label: 'Perimeter (Worst)', min: 50, max: 250, step: 0.1 },
    { name: 'area_se', label: 'Area (SE)', min: 0, max: 500, step: 0.1 },
    { name: 'texture_worst', label: 'Texture (Worst)', min: 12, max: 50, step: 0.1 },
    { name: 'symmetry_worst', label: 'Symmetry (Worst)', min: 0.15, max: 0.7, step: 0.001 },
    { name: 'compactness_mean', label: 'Compactness (Mean)', min: 0, max: 0.4, step: 0.001 },
    { name: 'concave points_mean', label: 'Concave Points (Mean)', min: 0, max: 0.2, step: 0.001 },
    { name: 'smoothness_mean', label: 'Smoothness (Mean)', min: 0.05, max: 0.16, step: 0.001 },
];

const PredictionInterface = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({});
    const [doctorNotes, setDoctorNotes] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
    };

    const handlePredict = async () => {
        setLoading(true); setError(''); setResult(null);
        try {
            const response = await MLService.predict({ features: formData, doctorNotes });
            setResult(response.data.data);
        } catch (err) {
            setError('Prediction failed. Ensure server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveReport = async () => {
        if (!result || !selectedPatient) {
            alert("Please run a prediction and select a patient first.");
            return;
        }
        try {
            await ReportService.createReport({
                patientId: selectedPatient.id,
                doctorId: user?.entityId, // Ensure doctor ID is sent
                clinicalFeatures: JSON.stringify(formData),
                predictionResult: result.prediction,
                confidenceScore: result.confidence,
                riskLevel: result.risk_level,
                doctorNotes: doctorNotes
            });
            alert("Report saved successfully to patient record!");
        } catch (error) {
            console.error("Error saving report", error);
            alert("Failed to save report.");
        }
    };

    const fillDemoData = () => {
        setFormData({
            'concave points_worst': 0.2654, 'texture_mean': 17.99, 'compactness_se': 0.0490,
            'perimeter_worst': 184.6, 'area_se': 153.4, 'texture_worst': 17.33,
            'symmetry_worst': 0.4601, 'compactness_mean': 0.2776, 'concave points_mean': 0.1471,
            'smoothness_mean': 0.1184
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-3 relative z-20">
                    <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
                        <Activity size={24} />
                    </div>
                    <div>
                        {selectedPatient ? (
                            <div className="animate-fade-in">
                                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedPatient(null)}>
                                    <h1 className="text-xl font-bold font-serif text-gray-900">Patient: {selectedPatient.name}</h1>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">Change</span>
                                </div>
                                <p className="text-xs text-gray-500">ID: #{selectedPatient.id} • {selectedPatient.gender}, {selectedPatient.age}yo</p>
                            </div>
                        ) : (
                            <div className="relative">
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-72 focus-within:ring-2 focus-within:ring-pink-200 transition-all">
                                    <Search size={16} className="text-gray-400" />
                                    <input
                                        type="text"
                                        autoFocus
                                        placeholder="Search by Patient ID or Name..."
                                        className="bg-transparent border-none outline-none text-sm w-full text-gray-700"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                {searchQuery && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                                        {patients.filter(p =>
                                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                            p.id.toLowerCase().includes(searchQuery.toLowerCase())
                                        ).length > 0 ? (
                                            patients.filter(p =>
                                                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                p.id.toLowerCase().includes(searchQuery.toLowerCase())
                                            ).map(patient => (
                                                <div
                                                    key={patient.id}
                                                    onClick={() => {
                                                        setSelectedPatient(patient);
                                                        setSearchQuery('');
                                                    }}
                                                    className="p-3 hover:bg-pink-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
                                                >
                                                    <p className="text-sm font-bold text-gray-800">{patient.name}</p>
                                                    <p className="text-xs text-gray-500">#{patient.id}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-3 text-xs text-gray-500 text-center">No matches found.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleSaveReport} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                        <Save size={16} /> Save to Patient Record
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium">
                        <Printer size={16} /> Export PDF
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-12 gap-8">
                {/* Input Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                <BarChart2 size={18} className="text-pink-500" /> Clinical Features
                            </h2>
                            <button onClick={fillDemoData} className="text-pink-600 text-xs font-semibold px-2 py-1 bg-pink-50 rounded hover:bg-pink-100 transition-colors">
                                Auto-Fill Demo
                            </button>
                        </div>

                        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            {FEATURES.map((feat) => (
                                <div key={feat.name} className="group">
                                    <label className="flex justify-between text-xs font-semibold text-gray-500 mb-1 group-focus-within:text-pink-600 transition-colors">
                                        <span>{feat.label}</span>
                                        {formData[feat.name] && <span className="text-pink-600">{formData[feat.name]}</span>}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number" step={feat.step} name={feat.name}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all placeholder-gray-300 font-medium text-gray-800"
                                            placeholder={`0.00`}
                                            value={formData[feat.name] || ''} onChange={handleChange}
                                        />
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <Info size={14} className="text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">Doctor's Notes</label>
                                <textarea
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none transition-all resize-none"
                                    rows="3" placeholder="Add clinical observations..."
                                    value={doctorNotes} onChange={(e) => setDoctorNotes(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            onClick={handlePredict}
                            disabled={loading}
                            className="w-full mt-6 btn-primary flex justify-center items-center gap-2 py-3.5 shadow-lg shadow-pink-200/50"
                        >
                            {loading ? (
                                <> <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                            ) : (
                                <> Run Analysis <ChevronRight size={18} /> </>
                            )}
                        </button>
                        {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2"><AlertCircle size={16} /> {error}</div>}
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-8">
                    <AnimatePresence>
                        {!result ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border border-dashed border-gray-300"
                            >
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <Activity size={32} className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready for Analysis</h3>
                                <p className="text-gray-500 max-w-sm">Enter clinical feature values on the left sidebar to generate a comprehensive AI diagnostic report.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Prediction Banner */}
                                <div className={`relative overflow-hidden rounded-3xl p-8 text-white shadow-xl ${result.prediction === 'BENIGN' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-pink-600'}`}>
                                    <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                                    <div className="relative z-10 flex justify-between items-center">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2 opacity-90">
                                                <span className="text-sm font-bold uppercase tracking-widest">AI Result</span>
                                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                                <span className="text-sm font-medium">{new Date().toLocaleDateString()}</span>
                                            </div>
                                            <h1 className="text-5xl font-bold mb-4 tracking-tight">{result.prediction_full}</h1>
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                                                    <span className="text-xs uppercase font-bold opacity-75 block mb-0.5">Confidence</span>
                                                    <span className="text-2xl font-bold">{Math.round(result.confidence * 100)}%</span>
                                                </div>
                                                <div className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2">
                                                    <span className="text-xs uppercase font-bold opacity-75 block mb-0.5">Risk Level</span>
                                                    <span className="text-2xl font-bold">{result.risk_level}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                                            {result.prediction === 'BENIGN' ? <CheckCircle size={48} className="text-white" /> : <AlertCircle size={48} className="text-white" />}
                                        </div>
                                    </div>
                                </div>

                                {/* XAI Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                                <BarChart2 size={18} className="text-blue-500" /> Key Indicators (SHAP)
                                            </h3>
                                            <div className="flex items-center gap-2 text-xs font-medium">
                                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span>Push to Malignant</span>
                                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Push to Benign</span>
                                            </div>
                                        </div>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart layout="vertical" data={result.shap_analysis.top_features} margin={{ left: 40 }}>
                                                    <XAxis type="number" hide />
                                                    <YAxis dataKey="feature" type="category" width={100} tick={{ fontSize: 10, fill: '#6B7280' }} />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                                    />
                                                    <Bar dataKey="shap_value" radius={4} barSize={20}>
                                                        {result.shap_analysis.top_features.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.shap_value > 0 ? '#EF4444' : '#10B981'} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                            <Activity size={18} className="text-purple-500" /> Model Logic (LIME)
                                        </h3>
                                        <div className="space-y-4">
                                            {result.lime_analysis.explanations.map((exp, i) => (
                                                <div key={i} className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                                                    <div className={`mt-1.5 w-2 h-2 shrink-0 rounded-full ${exp.weight > 0 ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                                    <div>
                                                        <code className="text-sm font-bold text-gray-800 block mb-1">{exp.rule}</code>
                                                        <span className="text-xs text-gray-500 font-medium">Impact: {exp.impact}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Clinical Suggestions */}
                                <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-6 flex items-center gap-2 text-lg">
                                        <FileText size={20} className="text-blue-600" /> Clinical Next Steps
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">Immediate Actions</h4>
                                            <ul className="space-y-3">
                                                {result.clinical_suggestions.immediate_action.map((act, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-blue-900 text-sm">
                                                        <CheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                                        {act}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">Recommended Tests</h4>
                                            <ul className="space-y-3">
                                                {result.clinical_suggestions.recommended_tests.map((test, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-blue-900 text-sm">
                                                        <Activity size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                                        {test}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PredictionInterface;
