import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { modifyUser } from '../../apis/userApi';
import CommonButton from '../../common/CommonButton';
import CommonInput from '../../common/CommonInput';
import SearchAddressDialog from '../auth/modal/SearchAddressDialog';
import {
  PASSWORDCONFIRM_FAIL_MESSAGE,
  VALIDITY_REGEX_SPENDINGTARGET,
  EMAIL_REGEX_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
  PASSWORD_REGEX_MESSAGE,
} from '../../common/Message';
import Profile from './Profile';
import theme from '../../theme/theme';

const StyledHr = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 5px;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 350px;
  margin: 0 auto;
`;

const Section = styled.div`
  width: 100%;
`;

const InnerSection = styled.div`
  margin-bottom: 15px;
`;

const Button = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
  width: 100%;
`;

const TitleStyle = styled.p`
  font-size: 16px;
  margin-bottom: 6px;
  margin-top: 0px;
  margin-left: 5px;
`;

const TextStyle = styled.p`
  font-size: 16px;
  margin-bottom: 0px;
  margin-top: 0px;
  margin-left: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0 0;
  text-align: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: relative;
  margin-left: 15px;
`;

const InputUserIdBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CheckUserInfo = ({
  userNum,
  userId,
  password,
  email,
  name,
  address,
  detailAddress,
  postcode,
  spendingTarget,
  profile,
  createdAt,
}) => {
  const [profileImage, setProfileImage] = useState(profile);
  const [previewImage, setPreviewImage] = useState(profile);
  const [isEditing, setIsEditing] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userNum: userNum,
    userId: userId || '',
    originPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: email || '',
    name: name || '',
    address: address || '',
    detailAddress: detailAddress || '',
    postcode: postcode || '',
    spendingTarget: spendingTarget || 0,
    profile: profile || '',
    createdAt: createdAt || '',
  });

  useEffect(() => {
    setUserInfo({
      userNum: userNum,
      userId: userId || '',
      originPassword: '',
      newPassword: '',
      confirmPassword: '',
      email: email || '',
      name: name || '',
      address: address || '',
      detailAddress: detailAddress || '',
      postcode: postcode || '',
      spendingTarget: spendingTarget || 0,
      profile: profile || '',
      createdAt: createdAt || '',
    });

    setPreviewImage(profile);
  }, [
    userNum,
    userId,
    email,
    name,
    address,
    detailAddress,
    postcode,
    spendingTarget,
    profile,
    createdAt,
  ]);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddressSelect = (address) => {
    setUserInfo((prev) => ({ ...prev, address }));
    setIsAddressModalOpen(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setPasswordError('');
  };

  const cancelEdit = () => {
    setProfileImage(profile);
    setPreviewImage(profile);

    setUserInfo({
      userNum: userNum,
      userId: userId || '',
      originPassword: '',
      newPassword: '',
      confirmPassword: '',
      email: email || '',
      name: name || '',
      address: address || '',
      detailAddress: detailAddress || '',
      postcode: postcode || '',
      spendingTarget: spendingTarget || '',
      profile: profile || '',
      createdAt: createdAt || '',
    });

    setIsEditing(!isEditing);
  };

  const isFormValid = () => {
    for (const key in userInfo) {
      if ((userInfo[key] + '').trim() === '') {
        console.log(key);
        return 1;
      }
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      return 2;
    }
  };

  const navigate = useNavigate();

  const inputRegexs = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[*@#$%^&+=!]).{8,}$/,
    spendingTarget: /^[0-9]*$/,
  };

  const save = () => {
    let isInvalid = true;

    if (isFormValid() === 1) {
      setPasswordError('모든 정보를 입력해주세요!');
      isInvalid = false;
    } else if (password !== userInfo.originPassword) {
      setPasswordError(PASSWORD_MISMATCH_MESSAGE);
      isInvalid = false;
    } else if (isFormValid() === 2) {
      setPasswordError(PASSWORDCONFIRM_FAIL_MESSAGE);
      isInvalid = false;
    }

    Object.keys(userInfo).forEach((field) => {
      if (field === 'email' && !inputRegexs.email.test(userInfo.email)) {
        setPasswordError(EMAIL_REGEX_MESSAGE);
        isInvalid = false;
      } else if (
        field === 'newPassword' &&
        !inputRegexs.password.test(userInfo.newPassword)
      ) {
        setPasswordError(PASSWORD_REGEX_MESSAGE);
        isInvalid = false;
      } else if (
        field === 'spendingTarget' &&
        !inputRegexs.spendingTarget.test(userInfo.spendingTarget)
      ) {
        setPasswordError(VALIDITY_REGEX_SPENDINGTARGET);
        isInvalid = false;
      }
    });

    if (!isInvalid) return;

    const updatedUserInfo = {
      ...userInfo,
      password: userInfo.newPassword,
      originPassword: undefined,
      confirmPassword: undefined,
      newPassword: undefined,
    };

    const formData = new FormData();
    formData.append('userInfo', JSON.stringify(updatedUserInfo));
    if (profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    } else {
      formData.append('profileText', profileImage);
    }

    formData.forEach((value, key) => console.log(key, value));

    modifyUser(formData).then((response) => {
      navigate(0);
    });
    // window.location.reload();
  };

  const deleteId = () => {};

  const disabledInputProps = {
    disabled: true,
    background: '#f5f5f5',
    width: '350px',
    $borderColor: 'transparent',
    $marginLeft: '10px',
    $focusBorderColor: 'transparent',
  };

  const abledInputProps = {
    width: '350px',
    background: 'transparent',
    $borderColor: 'transparent',
    $marginLeft: '10px',
    $focusBorderColor: 'transparent',
  };

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === 'newPassword' || key === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleInputChange = (e, field) => {
    setUserInfo((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const commonButtonProps = {
    width: '100px',
    height: '38px',
  };

  const nonEditField = [
    { title: '이름', value: name },
    { title: '아이디', value: userId },
    { title: '이메일', value: email },
    { title: '주소', value: address },
    { title: '상세주소', value: detailAddress },
    { title: '일일 목표 지출금액', value: spendingTarget },
  ];

  const editField = [
    {
      name: 'userId',
      text: '아이디',
      placeholder: '아이디를 입력하세요',
      disabled: true,
    },
    {
      name: 'originPassword',
      text: '기존 비밀번호 입력',
      placeholder: '기존 비밀번호 입력하세요',
      disabled: false,
      type: 'password',
    },
    {
      name: 'newPassword',
      text: '새로운 비밀번호 입력',
      placeholder: '새로운 비밀번호를 입력하세요',
      disabled: false,
      type: 'password',
    },
    {
      name: 'confirmPassword',
      text: '비밀번호 확인',
      placeholder: '비밀번호 확인',
      disabled: false,
      type: 'password',
    },
    {
      name: 'name',
      text: '이름',
      placeholder: '이름을 입력하세요',
      disabled: true,
    },
    {
      name: 'email',
      text: '이메일',
      placeholder: '이메일을 입력하세요',
      disabled: false,
    },
    {
      name: 'spendingTarget',
      text: '일일 목표 지출금액',
      placeholder: '일일 목표 지출금액을 입력하세요',
      disabled: false,
    },
  ];

  return (
    <Root>
      {isEditing ? (
        <Section>
          <Profile
            profileImage={profileImage}
            onImageChange={handleProfileChange}
            isEditing={isEditing}
          />

          {nonEditField.map((field, index) => (
            <InnerSection key={index}>
              <TitleStyle>{field.title}</TitleStyle>
              <TextStyle>{field.value}</TextStyle>
              <StyledHr />
            </InnerSection>
          ))}
        </Section>
      ) : (
        <>
          <Profile
            profileImage={previewImage}
            onProfileChange={handleProfileChange}
            isEditing={isEditing}
          />

          {editField.map((field, index) => (
            <InnerSection key={index}>
              <CommonInput
                value={userInfo[field.name]}
                text={field.text}
                placeholder={field.placeholder}
                type={field.type}
                onChange={(e) => handleChange(field.name, e.target.value)}
                {...(field.disabled ? disabledInputProps : abledInputProps)}
              />
              <StyledHr />
            </InnerSection>
          ))}

          <InnerSection>
            <InputUserIdBox>
              <CommonInput
                placeholder="주소를 입력하세요"
                text="주소"
                value={userInfo.address}
                {...abledInputProps}
                width="100%"
                onChange={(e) => handleInputChange(e, 'address')}
              />
              <ButtonWrapper>
                <CommonButton
                  width="100px"
                  height="40px"
                  text="주소검색"
                  fontSize={theme.fontSize.base}
                  onClick={() => setIsAddressModalOpen(true)}
                />
              </ButtonWrapper>
            </InputUserIdBox>

            <StyledHr />
          </InnerSection>

          <InnerSection>
            <CommonInput
              placeholder="상세 주소를 입력하세요"
              text="상세 주소"
              value={userInfo.detailAddress}
              onChange={(e) => handleChange('detailAddress', e.target.value)}
              {...abledInputProps}
            />
            <StyledHr />
          </InnerSection>

          {passwordError && <ErrorText>{passwordError}</ErrorText>}

          <SearchAddressDialog
            open={isAddressModalOpen}
            setModalVisible={setIsAddressModalOpen}
            onCompletePost={handleAddressSelect}
            setFormData={setUserInfo}
          />
        </>
      )}

      <Button>
        <CommonButton
          text={isEditing ? '수정' : '저장'}
          onClick={isEditing ? toggleEdit : save}
          {...commonButtonProps}
        />

        <CommonButton
          text={isEditing ? '회원 탈퇴' : '취소'}
          onClick={isEditing ? deleteId : cancelEdit}
          {...commonButtonProps}
        />
      </Button>
    </Root>
  );
};

export default CheckUserInfo;
