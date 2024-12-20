import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
const NaverIdLogin = styled.div`
	display: none;
`

const NaverLoginBtn = styled.button`
	display: flex;
	align-items: center;
    justify-content: center;
	width: 300px;
	height: 35px;
	background-color: #03c75a;
	border-radius: 6px;
    border-color: transparent
`



const NaverLoginTitle = styled.span`
	color: white;
	font-weight: 400;
	font-size: 14px;
	line-height: 24px;

    `;
const NaverLogin = () => {

    const naverRef=useRef()
    const {naver} =window

    const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_REST_API_KEY
    const NAVER_CALLBACK_URL = process.env.REACT_APP_NAVER_REDIRECT_URL
    const initializeNaverLogin = useCallback(()=>{
        const naverLogin = new naver.LoginWithNaverId({
            clientId:NAVER_CLIENT_ID,
            callbackUrl:NAVER_CALLBACK_URL,
            isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
            callbackHandle: true,

        })
        naverLogin.init()
    }, [NAVER_CLIENT_ID, NAVER_CALLBACK_URL, naver]);
    const userAccessToken = useCallback(() => {
		window.location.href.includes('access_token') && getToken()
	},[]);
	const getToken = () => {
		const token = window.location.href.split('=')[1].split('&')[0]
        console.log("Access Token:", token); // 토큰을 로그로 확인

	}

	useEffect(() => {
		initializeNaverLogin()
		userAccessToken()
	}, [initializeNaverLogin, userAccessToken]);
    
	const handleNaverLogin = () => {
		naverRef.current.children[0].click()
	}
    return (
		<>
        			<NaverIdLogin ref={naverRef} id="naverIdLogin" />
			<NaverLoginBtn onClick={handleNaverLogin}>
				<NaverLoginTitle>네이버 간편 회원가입/ 로그인</NaverLoginTitle>
			</NaverLoginBtn>
		</>
	)
};

export default NaverLogin;
