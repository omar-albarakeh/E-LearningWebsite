import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });
  const [newCourse, setNewCourse] = useState({ name: '', description: '', instructorId: '' });
}