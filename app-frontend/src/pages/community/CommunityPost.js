import styled from 'styled-components';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Profile } from '../../assets/images/Profile.svg';
import CommonHr from '../../common/CommonHr';
import HeartImg from '../../assets/images/HeartImg.png';
import EmptyHeartImg from '../../assets/images/EmptyHeartImg.png';
import { useState } from 'react';

const comments = [
  {
    name: '한교동',
    time: '1시간전',
    comment: '안녕하세요. 반갑습니다~!',
  },
  {
    name: '포차코',
    time: '30분전',
    comment: '안녕하세요. 반갑습니다~!',
  },
  {
    name: '포차코',
    time: '30분전',
    comment: '안녕하세요. 반갑습니다~!',
  },
  {
    name: '포차코',
    time: '30분전',
    comment: '안녕하세요. 반갑습니다~!',
  },
];
const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
  box-sizing: border-box;
  padding-top: ${(props) => props.theme.headerHeight};
  height: 100%;
`;

const Listbox = styled.div`
  margin: 20px 0px 20px 0px;
  display: flex;
  justify-content: start;
  align-items: center;
  & Button {
    margin-top: 6px;
    margin-left: 10px;
  }
`;
const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > div {
    padding-left: 20px;
    height: 100px;
    border: 1px solid #d7d7d7;
    border-radius: 20px;
    flex-direction: column;
    gap: 5px;
  }
`;
const TopRow = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 50px;
`;
const ImageBox = styled.div`
  & > svg {
    width: 50px;
    height: 50px;
  }
`;

const TimeText = styled.span`
  color: ${(props) => props.theme.color.lightGray};
  font-size: 12px;
  margin-left: 8px;
  margin-bottom: 5px;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TextBox = styled.div`
  & > p {
    color: ${(props) => props.theme.color.black};
    margin-left: 25px;
  }
`;
const LikeBox = styled.div`
  border: 1px solid lightGray;
  width: 50px;
  height: 28px;
  display: flex;
  align-items: center;
  margin: 0 20px 20px 0;
  & > p {
    margin-left: 5px;
  }
`;
const Heart = styled.img`
  margin-left: 5px;
  width: 20px;
  height: 20px;
`;

const HeartButton = ({ like, onClick }) => {
  return <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />;
};
const BottomBox = styled.div`
  display: flex;
  margin: 20px 0px 20px 0px;
  justify-content: flex-end;
  gap: 15px;
`;
const commonButtonProps = {
  width: '80px',
  height: '50px',
};
export function CommunityPost() {
  const location = useLocation();
  const { rowData } = location.state; // rowData에 상세 데이터가 들어 있음
  const navigate = useNavigate();

  const handleNavigateToCommunity = () => {
    navigate('/community');
  };
  const handleNavigateToEditForm = () => {
    navigate('/editFormBox');
  };
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(0);

  const toggleLike = () => {
    setLike((prev) => {
      const newLiked = !prev;
      setCount((prevCount) => {
        if (newLiked && prevCount === 0) {
          return prevCount + 1;
        } else if (!newLiked && prevCount > 0) {
          return prevCount - 1;
        }
        return prevCount;
      });
      return newLiked;
    });
  };

  return (
    <Root>
      <h2>{rowData.title}</h2> {/* 전달된 데이터에서 제목을 표시 */}
      <CommonHr
        width="918px"
        borderWidth="2px"
        borderColor="black"
        margin="10px auto 20px"
      />
      <div style={{ textAlign: 'right' }}>
        {rowData.author} | {rowData.regdate} | 조회수 {rowData.views}
      </div>{' '}
      <div style={{ width: '100%' }}>{rowData.content}</div> {/* 내용 표시 */}
      <Listbox>
        <CommonInput
          width="810px"
          height="50px"
          placeholder="댓글을 입력해주세요."
        />
        <CommonButton
          background-color="#3563E9"
          color="white"
          text="등록"
          {...commonButtonProps}
        />
      </Listbox>
      <CommentBox>
        {comments.map((comment, index) => {
          return (
            <div key={index}>
              <TopRow>
                <ImageBox>
                  <Profile />
                </ImageBox>
                <h3>
                  {comment.name} <TimeText>{comment.time}</TimeText>
                </h3>
              </TopRow>
              <BottomRow>
                <TextBox>
                  <p>{comment.comment}</p>
                </TextBox>

                <LikeBox>
                  <HeartButton like={like} onClick={toggleLike} />
                  <p>{count}</p>
                </LikeBox>
              </BottomRow>
            </div>
          );
        })}
      </CommentBox>
      <BottomBox>
        <CommonButton
          text="목록"
          font-size="20px"
          onClick={handleNavigateToCommunity}
          {...commonButtonProps}
        />
        <CommonButton
          text="수정"
          font-size="20px"
          onClick={handleNavigateToEditForm}
          {...commonButtonProps}
        />
        <CommonButton text="삭제" font-size="20px" {...commonButtonProps} />
      </BottomBox>
    </Root>
  );
}
export default CommunityPost;
