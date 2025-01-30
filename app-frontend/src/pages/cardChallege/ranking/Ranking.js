import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RankingComponent from './RankingComponent';
import RankingTable from './RankingTable';
import { updateRankings } from '../../../apis/rankingApi';
import { findUserById } from '../../../apis/userApi';
import { useSelector } from 'react-redux';

const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
`;

const Ranking = () => {
  const isLoggedIn = useSelector((state) => state.user.user?.userNum); // 현재 로그인한 유저의 userNum
  const [users, setUsers] = useState(null);
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isLoggedIn) {
          console.log('로그인 정보가 없습니다.');
        } else {
          const user = await findUserById(isLoggedIn);
          setUsers(user.data);
        }
      } catch (error) {
        console.log('에러메시지: ', error);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    const initializeRankings = async () => {
      try {
        const data = await updateRankings();
        setRankingList(data);
      } catch (error) {
        console.error('등수 업데이트 실패', error);
      }
    };

    initializeRankings();
  }, []);

  return (
    <Root>
      <RankingComponent rankingList={rankingList} />
      <RankingTable
        users={users}
        isLoggedIn={isLoggedIn}
        rankingList={rankingList}
      />
    </Root>
  );
};
export default Ranking;
