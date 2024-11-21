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
      fetchUsers(); // Refresh user list
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
      fetchCourses(); // Refresh course list
    } catch (error) {
      console.error('Error editing course:', error);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete(
        `http://localhost/e-learning/backend/delete_course.php?course_id=${courseId}`
      );
      alert(response.data.message);
      setCourses(courses.filter((course) => course.course_id !== courseId));
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
        {users.map((user) => (
          <li key={user.user_id}>
            {user.name} - {user.email} ({user.role})
            {user.is_banned ? (
              <span> (Banned)</span>
            ) : (
              <button onClick={() => handleBanUser(user.user_id)}>Ban</button>
            )}
          </li>
        ))}
      </ul>

      {/* Add User */}
      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <select
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleAddUser}>Add User</button>

      {/* View Courses */}
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            {course.course_name} (Instructor ID: {course.instructor_id})
            <button onClick={() => handleDeleteCourse(course.course_id)}>Delete</button>
            <button
              onClick={() =>
                handleEditCourse(course.course_id, {
                  course_name: prompt('Enter new course name:', course.course_name),
                  description: prompt('Enter new description:', course.description),
                })
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>

      {/* Add Course */}
      <h3>Add New Course</h3>
      <input
        type="text"
        placeholder="Course Name"
        value={newCourse.name}
        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
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
