import React from "react";
import styled from "styled-components";
import ddd from "./asset/img/ddd";
import iPhone from "./asset/img/iPhone.png";
function App() {
  return (
    <Container>
      <MookUp>
        <InnerContainer>dddddddddddddd</InnerContainer>
      </MookUp>
    </Container>
  );
}

export default App;

const Container = styled.div`
  /* background: url("./asset/img/iphone.png"); */
  width: 100%;
  height: 100vh;
  border: 1px solid #f00;
  display: flex;
  justify-content: center;
  align-content: center;
  overflow: hidden;
`;
const MookUp = styled.div`
  background: url(${iPhone});
  z-index: 9999;
  overflow: hidden;
  width: 400px;
  height: 850px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
  position: relative;
  border: 1px solid #f00;
`;
const InnerContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 90%;

  background: #0f0;
`;
const Bg = styled.div`
  background: url("https://ssl.pstatic.net/static/nid/join/m_sp_06_realname_48b1e603.png");
  background-size: 372px 326px;
  background-position: 0 -244px;
  background-repeat: no-repeat;
  width: 94px;
  height: 18px;
`;
