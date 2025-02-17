import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';

import Footer from './common/Footer';
import { MainHeader } from './common/MainHeader';

import { ThemeProvider } from 'styled-components';
import Common404Page from './common/Common404Page';
import { KakaoLoginHandler } from './pages/auth/components/KakaoLoginHandler';
import FindID from './pages/auth/FindID';
import FindPassword from './pages/auth/FindPassword';
import Login from './pages/auth/Login';
import ResetPassword from './pages/auth/ResetPassword';
import SignUp from './pages/auth/SignUp';
import CardAnalysis from './pages/cardAnalysis/CardAnalysis';
import { CardChallege } from './pages/cardChallege/CardChallege';
import { Community } from './pages/community/Community';
import { CommunityFormBox } from './pages/community/CommunityFormBox';
import { CommunityPost } from './pages/community/CommunityPost';
import { EditFormBox } from './pages/community/EditFormBox';
import { NoticeEditFormBox } from './pages/community/NoticeEditFormBox';
import { NoticeFormBox } from './pages/community/NoticeFormBox';
import { NoticePost } from './pages/community/NoticePost';
import { Intro } from './pages/intro/Intro';
import { MainPage } from './pages/main/MainPage';
import { MyCard } from './pages/mycard/MyCard';
import { MyPage } from './pages/mypage/MyPage';
import CardListTest from './test/CardListTest';
import theme from './theme/theme';

const Root = styled.div`
  & *,
  p {
    font-family: 'Noto Sans KR';
  }
`;

const ContentsBox = styled.div`
  min-height: calc(100vh - 85px);
`;

function Layout({ children }) {
  return (
    <Root>
      <MainHeader />
      <ContentsBox>{children}</ContentsBox>
      <Footer />
    </Root>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/login/oauth/callback/kakao"
              element={<KakaoLoginHandler />}
            />
            <Route path="/test" element={<CardListTest />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/find-id" element={<FindID />} />
            <Route path="/find-pwd" element={<FindPassword />} />
            <Route path="/reset-pwd" element={<ResetPassword />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/card-challege" element={<CardChallege />} />
            <Route path="/card-analysis" element={<CardAnalysis />} />
            <Route path="/community" element={<Community />} />
            <Route path="/communityFormBox" element={<CommunityFormBox />} />
            <Route path="/mycard" element={<MyCard />} />
            <Route path="/communityPost" element={<CommunityPost />} />
            <Route path="/notice/:id" element={<NoticePost />} />
            <Route path="/editFormBox" element={<EditFormBox />} />
            <Route path="/noticeFormBox" element={<NoticeFormBox />} />
            <Route path="/noticeList" element={<Community />} />
            <Route path="/error" element={<Common404Page />} />
            <Route
              path="/noticeEditFormBox/:id"
              element={<NoticeEditFormBox />}
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
