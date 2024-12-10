import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BackTesting = () => {
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/time')
      .then((response) => {
        setTime(response.data); // 서버에서 받은 응답 데이터 설정
      })
      .catch((err) => {
        console.error('Error fetching time:', err);
        setError('시간 데이터를 불러오지 못했습니다.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return <div>서버 시간: {time}</div>;
};

export default BackTesting;
