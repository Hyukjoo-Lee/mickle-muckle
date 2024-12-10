import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BackTesting2 = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/users')
      .then((response) => {
        setUsers(response.data); // 서버에서 받은 응답 데이터 설정
        console.log('유저' + users);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('유저 데이터를 불러오지 못했습니다.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>유저목록</h1>
      {users.map((user) => (
        <div key={user.uno}>
          <p>
            id: {user.id} <br />
            password: {user.password}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BackTesting2;
