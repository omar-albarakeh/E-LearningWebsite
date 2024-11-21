import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student' });
  const [newCourse, setNewCourse] = useState({ name: '', description: '', instructorId: '' });

  
  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/e-learning/backend/all_users.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost/e-learning/backend/all_courses.php');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost/e-learning/backend/add_user.php', newUser);
      alert(response.data.message);
      setUsers([...users, response.data.user]);
      setNewUser({ name: '', email: '', role: 'student' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost/e-learning/backend/ban_user.php?user_id=${userId}`
      );
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://localhost/e-learning/backend/add_course.php', {
        course_name: newCourse.name,
        description: newCourse.description,
        instructor_id: newCourse.instructorId,
      });
      alert(response.data.message);
      setCourses([...courses, response.data.course]);
      setNewCourse({ name: '', description: '', instructorId: '' });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };
 const handleEditCourse = async (courseId, updatedCourse) => {
    try {
      const response = await axios.put(
        `http://localhost/e-learning/backend/edit_course.php?course_id=${courseId}`,
        updatedCourse
      );
      alert(response.data.message);
      fetchCourses(); 
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

}