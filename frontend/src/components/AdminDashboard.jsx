import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '' });
  const [inviteEmail, setInviteEmail] = useState('');
}