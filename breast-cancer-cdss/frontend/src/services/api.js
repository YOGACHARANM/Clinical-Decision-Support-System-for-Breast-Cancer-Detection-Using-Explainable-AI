import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const ML_API_URL = 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers['Authorization'] = 'Bearer ' + user.token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const AuthService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('user');
    },
    registerPatient: (data) => api.post('/auth/signup/patient', data),
    registerDoctor: (data) => api.post('/auth/signup/doctor', data),
    getCurrentUser: () => JSON.parse(localStorage.getItem('user')),
};

const MLService = {
    predict: (data) => axios.post(`${ML_API_URL}/predict`, data),
    getFeatures: () => axios.get(`${ML_API_URL}/features`),
};

const PatientService = {
    getAllPatients: () => api.get('/patients'),
};

const ReportService = {
    createReport: (data) => api.post('/reports', data),
    getPatientReports: (patientId) => api.get(`/reports/patient/${patientId}`),
};

export { api, AuthService, MLService, PatientService, ReportService };
