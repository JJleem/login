import React from "react";
import styled from "styled-components";
import iPhone from "./asset/img/iPhone.png";
import hand from "./asset/img/hand.png";
import phonehead from "./asset/img/phonehead.png";
import Login from "./Components/Login";

function App() {
  return (
    <Container>
      <MookUp>
        <PhoneHead />
        <InnerContainer>
          <Hr />
          <Logo />
          <Login />
        </InnerContainer>
      </MookUp>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: -3;
  background: url(${hand});
  background-size: cover;
  background-position: cover;
  background-repeat: no-repeat;
  object-fit: center;
  overflow: hidden;
  @media ${({ theme }) => theme.xs} {
  }
`;
const MookUp = styled.div`
  background: url(${iPhone});
  overflow: hidden;
  width: 420px;
  height: 850px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  position: relative;
  z-index: 0;
  overflow: hidden;
  @media ${({ theme }) => theme.xs} {
    height: 100vh;
    width: 100vw;
  }
`;
const PhoneHead = styled.div`
  background: url(${phonehead});
  height: 30px;
  width: 208px;
  position: absolute;
  z-index: 2 !important;
  top: 4.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  @media ${({ theme }) => theme.xs} {
    display: none;
  }
`;
const InnerContainer = styled.div`
  width: 370px;
  height: 803px;
  background: #fff;
  z-index: 1;
  padding: 60px 20px 20px 20px;
  border-radius: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media ${({ theme }) => theme.xs} {
    padding-top: 20px;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  }
`;
const Logo = styled.div`
  background-image: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-size: 372px 326px;
  background-position: -66px -226px;
  background-repeat: no-repeat;
  width: 73px;
  height: 14px;
  display: block;
`;
const Hr = styled.div`
  position: absolute;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eee;
  top: 0;
  left: 0;
`;
