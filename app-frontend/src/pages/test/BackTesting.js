import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BackTesting = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Network response was not ok', error);
      }
    };
    fetchUser();
  }, []);

  return <div>Hi, User is {user}</div>;
};

export default BackTesting;
