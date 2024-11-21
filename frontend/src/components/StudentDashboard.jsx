import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [streams, setStreams] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ content: '', isPrivate: false });
  const [selectedFile, setSelectedFile] = useState(null);

  
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get('http://localhost/e-learning/backend/student_courses.php');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
 const fetchCourseStreams = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost/e-learning/backend/course_streams.php?course_id=${courseId}`
      );
      setStreams(response.data.streams);
      setAssignments(response.data.assignments);
      setComments(response.data.comments);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error('Error fetching course streams:', error);
    }
  };

  const handleSubmitAssignment = async (assignmentId) => {
    const formData = new FormData();
    formData.append('assignment_id', assignmentId);
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        'http://localhost/e-learning/backend/submit_assignment.php',
        formData
      );
      alert(response.data.message);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

}