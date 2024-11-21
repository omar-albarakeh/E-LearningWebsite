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
}