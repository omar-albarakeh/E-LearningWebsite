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

  const handlePostComment = async () => {
    try {
      const response = await axios.post(
        'http://localhost/e-learning/backend/post_comment.php',
        { course_id: selectedCourse, ...newComment }
      );
      alert(response.data.message);
      fetchCourseStreams(selectedCourse);
      setNewComment({ content: '', isPrivate: false });
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>

      {/* Enrollments */}
      <h2>Enrolled Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            <strong>{course.course_name}</strong>
            <button onClick={() => fetchCourseStreams(course.course_id)}>View Stream</button>
          </li>
        ))}
      </ul>

      {/* Course Stream */}
      {selectedCourse && (
        <div>
          <h2>Course Stream</h2>
          <h3>Announcements</h3>
          <ul>
            {streams.map((stream) => (
              <li key={stream.id}>{stream.content}</li>
            ))}
          </ul>

          {/* Assignments */}
          <h3>Assignments</h3>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <strong>{assignment.title}</strong>
                <p>{assignment.description}</p>
                <input
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button onClick={() => handleSubmitAssignment(assignment.id)}>
                  Submit Assignment
                </button>
              </li>
            ))}
          </ul>

          {/* Comments */}
          <h3>Comments</h3>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.is_private ? 'Private' : 'Public'}</strong>: {comment.content}
              </li>
            ))}
          </ul>

          {/* Post a Comment */}
          <textarea
            placeholder="Write a comment..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={newComment.isPrivate}
              onChange={(e) => setNewComment({ ...newComment, isPrivate: e.target.checked })}
            />
            Private Comment
          </label>
          <button onClick={handlePostComment}>Post Comment</button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
