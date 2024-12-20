import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none; /* 버튼의 보더를 제거 */
  padding: 0; /* 버튼의 기본 패딩을 없애는 옵션 */
  background: transparent; /* 버튼의 배경을 투명하게 설정 */
`;
const StyledImage=styled.img`
background: transparent;
width: 30px;
cursor: pointer;
`
const NaverButton = ({ imagesRoute, client_id, redirect_url, state }) => {
  const AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_url}`;
  const LoginButton = () => {
    window.location.href = AUTH_URL;
  };

  return (
    <StyledButton onClick={LoginButton}>
      <StyledImage src={imagesRoute} alt="사진" />
    </StyledButton>
  );
};
export default NaverButton;
