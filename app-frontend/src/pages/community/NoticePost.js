import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteNotice, fetchNoticeDetail } from '../../apis/noticeApi';
import CommonButton from '../../common/CommonButton';
import CommonHr from '../../common/CommonHr';

const Root = styled.div`
  width: ${(props) => props.theme.display.lg};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const MoveButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MoveButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.sm};
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
`;

const NoticeHeader = styled.div`
  width: 1200px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & p {
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSize.eighteen};
    margin: 0;
  }

  & p span {
    color: #4064e6;
  }
`;

const StyledButton = styled(CommonButton).attrs({
  width: '100px',
  height: '40px',
  fontSize: '20px',
})`
  margin-top: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin: 0 auto;
  & > label.title {
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
  & > label.date {
    color: ${(props) => props.theme.color.gray};
    margin-top: 20px;
  }
`;

const DataBox = styled.div``;

const EditBox = styled.div`
  gap: 10px;
  display: flex;
`;

export function NoticePost() {
  const [noticeData, setNoticeData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 가져오기
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNoticeData = async () => {
      console.log('Fetching data for ID:', id); // ID가 잘 전달되는지 확인
      try {
        const data = await fetchNoticeDetail(id); // fetchNoticeDetail에서 데이터를 받아오기
        console.log('Notice Data:', data); // 받아온 데이터 확인
        if (data.success) {
          setNoticeData(data.data); // 받아온 데이터 상태에 저장
        } else {
          alert(data.message); // 오류 메시지 처리
        }
      } catch (error) {
        console.error('Error fetching post data : ', error);
      }
    };
    if (id) {
      fetchNoticeData();
    }
  }, [id]); // id 값이 변경될 때마다 호출

  const handleEditClick = (id) => {
    navigate(`/noticeEditFormBox/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteNotice([parseInt(id, 10)]);
      alert('삭제되었습니다!');
      navigate('/community');
    } catch (error) {
      console.error('삭제 중 오류 발생 : ', error);
      alert('삭제에 실패했습니다. 다시 시도해주세요!');
    }
  };

  const handleNavigateToNotice = () => {
    navigate('/noticeList');
  };

  const handleNavigateToNext = () => {
    const nextId = parseInt(id, 10) + 1;
    navigate(`/notice/${nextId}`);
  };

  if (!noticeData) {
    return <div>Loading ..</div>; // 로딩 중 표시
  }

  return (
    <Root>
      <MoveButtonWrap>
        <MoveButton onClick={handleNavigateToNotice}>&lt; 목록</MoveButton>
        <MoveButton onClick={handleNavigateToNext}>다음 &gt;</MoveButton>
      </MoveButtonWrap>

      <NoticeHeader>
        <p>
          공지사항 <span>{noticeData?.noticeNo}</span>
        </p>
        <EditBox>
          <StyledButton text="수정" onClick={() => handleEditClick(id)} />
          <StyledButton text="삭제" onClick={handleDelete} />
        </EditBox>
      </NoticeHeader>

      <CommonHr
        width="1200px"
        margin="20px 0px"
        borderWidth="1.5px"
        borderColor="rgba(128, 128, 128, 0.7)"
      />

      <Box>
        <label className="title">{noticeData.title}</label>
        <label className="date">{noticeData.createdAt}</label>
      </Box>

      <CommonHr />

      <DataBox>
        <div>{noticeData.content}</div>
        {noticeData.imgurl && (
          <div>
            <img
              src={`${baseURL}${noticeData.imgurl}`}
              alt="공지 이미지"
              style={{ marginTop: '20px' }}
            />
          </div>
        )}
      </DataBox>
    </Root>
  );
}

export default NoticePost;
