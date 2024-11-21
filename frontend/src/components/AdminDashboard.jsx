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
      const response = await axios.get('http://localhost/e-learning/backend/instructor_courses.php');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

    const fetchAnnouncements = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost/e-learning/backend/course_announcements.php?course_id=${courseId}`
      );
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchAssignments = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost/e-learning/backend/course_assignments.php?course_id=${courseId}`
      );
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };
   const handleAddAnnouncement = async (courseId) => {
    try {
      const response = await axios.post(
        'http://localhost/e-learning/backend/add_announcement.php',
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
        'http://localhost/e-learning/backend/add_assignment.php',
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
        'http://localhost/e-learning/backend/invite_student.php',
        { course_id: courseId, email: inviteEmail }
      );
      alert(response.data.message);
      setInviteEmail('');
    } catch (error) {
      console.error('Error inviting student:', error);
    }
  };


}