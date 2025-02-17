import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../apis/userApi';
// import * as authApi from '../../apis/authApi';
import { userActions } from '../reducers/userReducer';

// 로그인
export const loginUser = createAsyncThunk(
  'user/login',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.login(formData);

      dispatch(userActions.loginSuccessful(response));
      return response;
    } catch (error) {
      console.error('로그인 실패: ', error);
      return rejectWithValue(error.response?.data || '로그인 오류');
    }
  },
);

export const kakaoLoginUser = createAsyncThunk(
  'user/kakaoLogin',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await dispatch(userActions.loginSuccessful());
      return response;
    } catch (error) {
      console.error('카카오 로그인 실패: ', error);
      return rejectWithValue(error.response?.data || '카카오 로그인 오류');
    }
  },
);

// 로그아웃
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    dispatch(userActions.logout());
  },
);

// 유저 정보 업데이트
export const updateUserProfile = createAsyncThunk(
  'user/update',
  async (updatedData, { dispatch, rejectWithValue }) => {
    try {
      const response = await userApi.modifyUser(updatedData);

      dispatch(userActions.updateUserProfile({ data: response.data }));
      return response;
    } catch (error) {
      console.error('유저 정보 업데이트 실패: ', error);
      return rejectWithValue(error.response?.data || '유저 정보 업데이트 오류');
    }
  },
);
