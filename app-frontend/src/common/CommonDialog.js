import React from 'react';
import styled from 'styled-components';
import CustomButton from './CommonButton';

const DialogOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 998;
`;

const DialogWrapper = styled.div`
  display: ${(props) => (props.open ? 'flex' : 'none')};
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
  width: ${(props) => props.width || '500px'};
  margin: 0 auto;
  padding: 40px 20px 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  min-height: 120px;
  padding: 16px;
  box-sizing: border-box;
  font-size: ${(props) => props.fontSize || '28px'};
  color: ${(props) => props.color || props.theme.color.blue};
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

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CommonDialog = (props) => {
  const {
    className,
    open,
    children,
    width,
    fontSize,
    color,
    text1 = '확인',
    text2 = '취소',
    value,
    onChange,
    onClick,
    onClose,
  } = props;

  return (
    <div>
      <DialogOverlay open={open} />
      <DialogWrapper className={className} tabIndex="-1" open={open}>
        <DialogInner tabIndex="0" width={width}>
          <ContentWrapper
            fontSize={fontSize}
            color={color}
            onChange={onChange}
            value={value}
          >
            {children}
          </ContentWrapper>

          <CloseButton type="button" onClick={onClose}>
            ×
          </CloseButton>
          <ButtonBox>
            <CustomButton text={text1} height="30px" onClick={onClick} />
            <CustomButton text={text2} height="30px" onClick={onClose} />
          </ButtonBox>
        </DialogInner>
      </DialogWrapper>
    </div>
  );
};
export default CommonDialog;
