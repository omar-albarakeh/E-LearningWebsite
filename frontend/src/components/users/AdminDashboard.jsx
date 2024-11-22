import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', instructorId: '' });
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', role: 'Student', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

   const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/e-learning/backend/admin/all_users.php');
      if (Array.isArray(response.data)) {
        setUsers(response.data); 
      } else {
        console.error('Invalid users data', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost/e-learning/backend/admin/add_user.php', newUser);
      alert(response.data.message);
      setUsers([...users, response.data.user]);
      setNewUser({ username: '', email: '', role: 'Student', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost/e-learning/backend/admin/all_courses.php');
      setCourses(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  const handleBanUser = async (userId) => {
    try {
      const response = await axios.post(
        `http://localhost/e-learning/backend/admin/ban_user.php`,
        { user_id: userId }
      );
      alert(response.data.message);
      fetchUsers();
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://localhost/e-learning/backend/admin/add_course.php', {
        title: newCourse.title,
        description: newCourse.description,
        instructor_id: newCourse.instructorId,
      });
      alert(response.data.message);
      if (response.data.course) setCourses([...courses, response.data.course]);
      setNewCourse({ title: '', description: '', instructorId: '' });
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleEditCourse = async (courseId, updatedCourse) => {
    try {
      const response = await axios.put(
        `http://localhost/e-learning/backend/admin/edit_course.php`,
        { course_id: courseId, ...updatedCourse }
      );
      alert(response.data.message);
      fetchCourses();
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.post(
        `http://localhost/e-learning/backend/admin/delete_course.php`,
        { course_id: courseId }
      );
      alert(response.data.message);
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* View Users */}
      <h2>Users</h2>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.user_id}>
              {user.name ? user.name : 'No name'} - ({user.role})
              {user.is_banned ? (
                <span> (Banned)</span>
              ) : (
                <button onClick={() => handleBanUser(user.user_id)}>Ban</button>
              )}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>

      {/* Add User */}
      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="Student">Student</option>
        <option value="Instructor">Instructor</option>
        <option value="Admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>
     {/* Add Course */}
      <h3>Add New Course</h3>
      <input
        type="text"
        placeholder="Course Title"
        value={newCourse.title}
        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newCourse.description}
        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Instructor ID"
        value={newCourse.instructorId}
        onChange={(e) => setNewCourse({ ...newCourse, instructorId: e.target.value })}
      />
      <button onClick={handleAddCourse}>Add Course</button>
    </div>
  );
};

export default AdminDashboard;
