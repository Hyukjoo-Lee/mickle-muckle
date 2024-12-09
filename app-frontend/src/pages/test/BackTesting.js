import axios from 'axios';
import React, { useState, useEffect } from 'react';

const BackTesting = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    axios
      .get('/api/user')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return <div>Hi, User is {user}</div>;
};

export default BackTesting;
