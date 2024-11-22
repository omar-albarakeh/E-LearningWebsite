import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '' });
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost/e-learning/backend/instructor/instructor_courses.php');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAnnouncements = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost/e-learning/backend/instructor/course_announcements.php?course_id=${courseId}`
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchAssignments = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost/e-learning/backend/instructor/course_assignments.php?course_id=${courseId}`
      );
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAnnouncement = async (courseId) => {
    try {
      const response = await axios.post(
        'http://localhost/e-learning/backend/instructor/add_announcement.php',
        { course_id: courseId, content: newAnnouncement }
      );
      alert(response.data.message);
      fetchAnnouncements(courseId);
      setNewAnnouncement('');
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  const handleAddAssignment = async (courseId) => {
    try {
      const response = await axios.post(
        'http://localhost/e-learning/backend/instructor/add_assignment.php',
        { course_id: courseId, ...newAssignment }
      );
      alert(response.data.message);
      fetchAssignments(courseId);
      setNewAssignment({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding assignment:', error);
    }
  };

  const handleInviteStudent = async (courseId) => {
    try {
      const response = await axios.post(
        'http://localhost/e-learning/backend/instructor/invite_student.php',
        { course_id: courseId, email: inviteEmail }
      );
      alert(response.data.message);
      setInviteEmail('');
    } catch (error) {
      console.error('Error inviting student:', error);
    }
  };

  return (
    <div>
      <h1>Instructor Dashboard</h1>

      {/* Assigned Courses */}
      <h2>Your Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            <strong>{course.course_name}</strong>
            <button onClick={() => fetchAnnouncements(course.course_id)}>
              View Announcements
            </button>
            <button onClick={() => fetchAssignments(course.course_id)}>
              View Assignments
            </button>

            {/* Post Announcement */}
            <h3>Post Announcement</h3>
            <textarea
              placeholder="Write an announcement..."
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
            />
            <button onClick={() => handleAddAnnouncement(course.course_id)}>
              Post Announcement
            </button>

            {/* Add Assignment */}
            <h3>Add Assignment</h3>
            <input
              type="text"
              placeholder="Assignment Title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            />
            <textarea
              placeholder="Assignment Description"
              value={newAssignment.description}
              onChange={(e) =>
                setNewAssignment({ ...newAssignment, description: e.target.value })
              }
            />
            <button onClick={() => handleAddAssignment(course.course_id)}>
              Add Assignment
            </button>

            {/* Invite Students */}
            <h3>Invite Students</h3>
            <input
              type="email"
              placeholder="Student Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button onClick={() => handleInviteStudent(course.course_id)}>Invite</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructorDashboard;
