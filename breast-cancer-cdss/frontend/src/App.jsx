import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PatientSignup from './pages/PatientSignup';
import DoctorSignup from './pages/DoctorSignup';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PredictionInterface from './pages/PredictionInterface';


// ... others will be imported when created

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/patient" element={<LoginPage role="patient" />} />
          <Route path="/login/doctor" element={<LoginPage role="doctor" />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/signup/doctor" element={<DoctorSignup />} />

          <Route path="/patient-dashboard" element={
            <PrivateRoute role="PATIENT">
              <PatientDashboard />
            </PrivateRoute>
          } />

          <Route path="/doctor-dashboard" element={
            <PrivateRoute role="DOCTOR">
              <DoctorDashboard />
            </PrivateRoute>
          } />

          <Route path="/prediction" element={
            <PrivateRoute role="DOCTOR">
              <PredictionInterface />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
