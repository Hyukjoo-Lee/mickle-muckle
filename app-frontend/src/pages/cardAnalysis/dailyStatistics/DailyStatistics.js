import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ResizeObserver from 'resize-observer-polyfill';
import styled from 'styled-components';
import { fetchDailyStatistics } from '../../../apis/dailyStatisticsApi.js';
import { findUserById } from '../../../apis/userApi';
import { ReactComponent as BadCoin } from '../../../assets/images/BadCoin.svg';
import { ReactComponent as ExcellentCoin } from '../../../assets/images/ExcellentCoin.svg';
import { ReactComponent as GoodCoin } from '../../../assets/images/GoodCoin.svg';
import { ReactComponent as VeryGoodCoin } from '../../../assets/images/VeryGoodCoin.svg';
import { updateHistory } from '../../../apis/cardHistoryApi.js';
import CommonCardListBox from '../../../common/CommonCardListBox';
import CommonLoading from '../../../common/CommonLoading.js';
import Calendar from './calendar/Calendar';

const Root = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 700px 1fr;
  gap: 30px;
  box-sizing: border-box;
`;
const CalendarBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin-top: 5px;
  & div {
    display: flex;
    align-items: center;
  }
  & p {
    margin: 0 0 0 8px;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.color.lightGray};
  }
  & svg {
    width: 20px;
    height: 20px;
  }
`;

const ListBox = styled.div`
  height: ${({ $dynamicHeight }) => `${$dynamicHeight}px`};
  overflow-y: auto;
  transition: height 0.3s ease; /* 부드러운 전환 효과 */
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const MessageBox = styled.p`
  text-align: center;
  color: gray;
`;

export const EmptyBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.color.gray};
  }
`;

const DailyStatistics = () => {
  const Lists = [
    { icon: <BadCoin />, text: '0~25% 소비절약' },
    { icon: <GoodCoin />, text: '26~50% 소비절약' },
    { icon: <VeryGoodCoin />, text: '51~75% 소비절약' },
    { icon: <ExcellentCoin />, text: '76~100% 소비절약' },
  ];
  const isLoggedIn = useSelector((state) => state.user.user?.userNum); // 현재 로그인한 유저의 userNum
  const [statistics, setStatistics] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdate, setIsUpdate] = useState(true);
  const [users, setUsers] = useState(null);
  const [dynamicHeight, setDynamicHeight] = useState(541); // 기본 높이 설정
  const calendarRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await findUserById(isLoggedIn);
      if (user != null && typeof user != 'string') {
        setUsers(user.data);
      }

      const history = await updateHistory(isLoggedIn);
      if (history) {
        const updatedData = await fetchDailyStatistics(isLoggedIn);
        if (typeof updatedData === 'string') {
          console.log(updatedData);
          // 예외 발생시 다이얼로그 처리 필요
        } else if (updatedData != null) {
          setStatistics(updatedData.data);
        }
        setIsUpdate(false);
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  const fetchStatistics = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchDailyStatistics(isLoggedIn); // API 호출
      if (typeof data === 'string') {
        console.log(data); // 예외 발생시 다이얼로그 처리 필요
      } else if (data != null) {
        setStatistics(data.data);
      }
    } catch (error) {
      console.error('유저 정보 실패: ', users);
    } finally {
      setIsLoading(false); // 데이터 로드 완료 후 로딩 상태 false
    }
  }, [isLoggedIn, users]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchStatistics();
    }
  }, [isLoggedIn, fetchStatistics]);

  // 동적으로 ListBox 높이 조정
  const adjustHeight = () => {
    if (calendarRef.current) {
      const calendarHeight = calendarRef.current.offsetHeight;
      setDynamicHeight(calendarHeight);
    }
  };

  useEffect(() => {
    const observer = new ResizeObserver(() => adjustHeight());
    const currentRef = calendarRef.current;

    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // 선택한 형식날짜를 YYYY-MM-DD 형식으로
  const formatDate = (date) => {
    if (typeof date === 'string' && date.length === 8) {
      // '20240105' 형식을 '2024-01-05'로 변환
      const year = date.slice(0, 4);
      const month = date.slice(4, 6);
      const day = date.slice(6, 8);
      return `${year}-${month}-${day}`;
    } else if (date instanceof Date) {
      // Date 객체를 '2024-01-05' 형식으로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return date; // 원래 값 반환 (예외 처리)
  };

  const filteredStatistics = statistics.filter((item) => {
    const formattedDate = formatDate(selectedDate);
    const resUsedDateFormatted = formatDate(item.resUsedDate);
    return resUsedDateFormatted === formattedDate;
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    adjustHeight(); // 날짜 클릭 시 높이 재계산
  };

  return (
    <Root>
      <CalendarBox>
        <div ref={calendarRef}>
          <Calendar
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            statistics={statistics}
            adjustHeight={adjustHeight}
          />
        </div>

        <CalendarBottomBox>
          {Lists.map((item, index) => (
            <div key={index}>
              {item.icon}
              <p>{item.text}</p>
            </div>
          ))}
        </CalendarBottomBox>
      </CalendarBox>

      <ListBox $dynamicHeight={dynamicHeight}>
        {isLoading ? (
          <EmptyBox>
            <CommonLoading />
          </EmptyBox>
        ) : filteredStatistics.length > 0 ? (
          filteredStatistics.map((item, index) => (
            <CommonCardListBox
              key={item.resApprovalNo}
              cardItem={{
                ...item,
                resUsedDate: formatDate(item.resUsedDate), // 변환된 날짜 전달
                cardImgUrl: filteredStatistics[index].cardImg,
              }}
              showDetailed={false}
            />
          ))
        ) : (
          <EmptyBox>
            <p>소비 내역이 없습니다.</p>
          </EmptyBox>
        )}
      </ListBox>

      {isUpdate && (
        <MessageBox>
          최신 데이터를 갱신 중입니다. 이 작업은 몇 초 정도 소요될 수 있습니다.
        </MessageBox>
      )}
    </Root>
  );
};
export default DailyStatistics;
