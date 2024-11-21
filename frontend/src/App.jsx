import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentPage from './components/StudentDashboard';
import InstructorPage from './components/InstructorDashboard';
import AdminPage from './components/AdminDashboard';

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const isAuthenticated = !!token;
  const authRoutes = ['/login', '/register']; 
  const showNavFooter = isAuthenticated && !authRoutes.includes(location.pathname);

  return (
    <div>
      {showNavFooter && <NavBar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {isAuthenticated ? (
            <>
              <Route path="/student" element={<StudentPage />} />
              <Route path="/instructor" element={<InstructorPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
      {showNavFooter && <Footer />}
    </div>
  );
};

export default App;