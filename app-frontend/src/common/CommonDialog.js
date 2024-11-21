import React from 'react';
import styled from 'styled-components';
import CustomButton from './CommonButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DialogOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.$visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 998;
`;

const DialogWrapper = styled.div`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 30%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999; /* 다이어로그가 배경 위에 표시되도록 */
`;

const DialogInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: ${(props) => (props.width ? props.width : '500px')};
  height: ${(props) => (props.height ? props.height : '500px')};
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: ${(props) => (props.$Contentwidth ? props.$Contentwidth : '460px')};
  height: ${(props) => (props.$Contentheight ? props.$Contentheight : '400px')};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '28px')};
  color: ${(props) => (props.color ? props.color : props.theme.color.blue)};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  &:hover {
    color: blue;
  }
`;

const CommonDialog = (props) => {
  const {
    className,
    $visible,
    children, //들어갈 내용 초기값
    width,
    height,
    fontSize,
    color,
    $Contentwidth,
    $Contentheight,
    text1 = '확인',
    text2 = '취소',
    width1 = '100px',
    width2 = '100px',
    value,
    onChange,
    onClick,
    navigateTo,
    navigateMain,
  } = props;

  const [isOpen, setIsOpen] = useState($visible); // 다이얼로그 상태 관리
  const navigate = useNavigate();
  useEffect(() => {
    setIsOpen($visible);
  }, [$visible]);
  const handleClose = () => {
    setIsOpen(false); // 다이얼로그 닫기
    navigate('/MainPage');
  };
  const handleClick = () => {
    if (text1) {
      navigate(navigateTo); // 확인 버튼 클릭 시 navigateTo 경로로 이동
    } else if (text2) {
      navigate(navigateMain); // 취소 버튼 클릭 시 navigateMain 경로로 이동
    }
  };

  return (
    <div>
      <DialogOverlay $visible={$visible} />
      <DialogWrapper className={className} tabIndex="-1" $visible={isOpen}>
        <DialogInner tabIndex="0" width={width} height={height}>
          <ContentWrapper
            fontSize={fontSize}
            color={color}
            $Contentwidth={$Contentwidth}
            $Contentheight={$Contentheight}
            onChange={onChange}
            value={value}
          >
            {children}
          </ContentWrapper>

          <CloseButton type="button" onClick={handleClose}>
            ×
          </CloseButton>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              gap: '10px',
              zIndex: '1001',
            }}
          >
            <CustomButton
              text={text1}
              width={width1}
              height="30px"
              onClick={onClick}
            />
            <CustomButton
              text={text2}
              width={width2}
              height="30px"
              onClick={handleClick}
            />
          </div>
        </DialogInner>
      </DialogWrapper>
    </div>
  );
};
export default CommonDialog;
