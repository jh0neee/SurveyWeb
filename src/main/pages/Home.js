import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 10px;
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00a4fa;
  clip-path: circle(600px at right 700px);
`;

const CheckImg = styled.img`
  position: absolute;
  bottom: 265px;
  right: 140px;
`;

const MainImg = styled.img`
  position: absolute;
  width: 250px;
  height: 250px;
  bottom: 35px;
  right: 135px;
`;

const TextBox = styled.div`
  position: relative;
  top: 50px;
  max-width: 600px;
`;

const Description = styled.h2`
  color: #333;
  font-size: 4em;
  line-height: 1.4em;
  font-weight: 500;
`;

const PrimaryDesc = styled.span`
  color: #00507a;
  font-size: 1.2em;
  font-weight: 900;
`;

const Explanation = styled.p`
  color: #333;
`;

const GotoBtn = styled.button`
  display: inline-block;
  margin-top: 20px;
  padding: 8px 20px;
  background: #00a4fa;
  color: #fff;
  border-radius: 40px;
  font-weight: 500;
  letter-spacing: 1px;
  text-decoration: none;
`;

const Thumb = styled.ul`
  position: absolute;
  top: 45%;
  right: -15px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ThumbLine = styled.li`
  list-style: none;
  display: inline-block;
  margin: 15px 0;
  cursor: pointer;
  transition: 0.5s;

  &:hover  {
    transform: translateY(-15px);
  }
`;

const ThumbImg = styled.img`
  width: 50px;
  height: 50px;
`;

const Home = () => {
  const happy = `${process.env.PUBLIC_URL}/image/happy.png`;
  const nervous = `${process.env.PUBLIC_URL}/image/nervous.png`;
  const surprised = `${process.env.PUBLIC_URL}/image/surprised.png`;
  const [imgSrc, setImgSrc] = useState();

  return (
    <>
      <GlobalStyle />
      <Container>
        <Circle>
          <CheckImg
            src={`${process.env.PUBLIC_URL}/image/Check.png`}
            alt="check_img"
          />
          <MainImg src={imgSrc || happy} alt="happy" />
        </Circle>
        <Content>
          <TextBox>
            <Description>
              Do it Now,
              <br />
              <PrimaryDesc>Survey!</PrimaryDesc>
            </Description>
            <Explanation>
              설문을 작성해보세요, 개인과 기업의 리서치를 모아드립니다.
              <br /> 직관적인 결과를 바로 확인해보실 수 있습니다.
            </Explanation>
            <GotoBtn>설문하러가기</GotoBtn>
          </TextBox>
        </Content>
        <Thumb>
          <p>Click Here!</p>
          <ThumbLine>
            <ThumbImg
              src={happy}
              alt="happy"
              onClick={() => setImgSrc(happy)}
            />
          </ThumbLine>
          <ThumbLine>
            <ThumbImg
              src={nervous}
              alt="nervous"
              onClick={() => setImgSrc(nervous)}
            />
          </ThumbLine>
          <ThumbLine>
            <ThumbImg
              src={surprised}
              alt="surprise"
              onClick={() => setImgSrc(surprised)}
            />
          </ThumbLine>
        </Thumb>
      </Container>
    </>
  );
};

export default Home;
