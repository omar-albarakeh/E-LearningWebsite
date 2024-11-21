import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './components/login';
import Signup from './components/signup';
import StudentPage from './components/student';
import InstructorPage from './components/instructor';
import AdminPage from './components/admin';

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const isAuthenticated = !!token;
  const authRoutes = ['/login', '/register'];
  const showNavFooter = isAuthenticated && !authRoutes.includes(location.pathname);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  );
};

export default App;