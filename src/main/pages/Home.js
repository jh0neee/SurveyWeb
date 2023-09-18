import React, { useState } from "react";
import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";

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

  @media screen and (max-width: 1024px) {
    padding: 20px;
    justify-content: center;
  }
`;

const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00a4fa;
  clip-path: circle(600px at right 700px);

  @media screen and (max-width: 1024px) {
    clip-path: circle(600px at center 980px);
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const CheckImg = styled.img`
  ${(props) =>
    props.medium &&
    css`
      position: absolute;
      width: 70px;
      height: 50px;
      bottom: 11rem;
      right: 13rem;
    `}

  @media screen and (min-width: 1024px) {
    position: absolute;
    bottom: 300px;
    right: 200px;
    ${(props) =>
      props.medium &&
      css`
        display: none;
      `}
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const MainImg = styled.img`
  position: absolute;
  width: 250px;
  height: 250px;
  bottom: 35px;
  right: 135px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const TextBox = styled.div`
  position: relative;
  top: 50px;
  max-width: 600px;

  @media screen and (max-width: 1024px) {
    top: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    top: 30px;
  }
`;

const Description = styled.h2`
  color: #333;
  padding-bottom: 8rem;
  font-size: 4em;
  line-height: 0.9em;
  font-weight: 500;

  @media screen and (max-width: 600px) {
    background: #00a4fa;
    font-size: 3.2em;
    padding: 40px;
    border-radius: 80px;
  }
`;

const PrimaryDesc = styled.span`
  color: #00507a;
  font-size: 1.2em;
  font-weight: 900;
`;

const Explanation = styled.p`
  color: #333;
  padding: 0 0 10px 0;

  @media screen and (max-width: 1024px) {
    text-align: center;
    font-size: 1.45rem;
    line-height: 1.2;
  }
  @media screen and (max-width: 600px) {
    margin: 50px 0 25px 0;
    font-size: 1.2rem;
  }
  @media screen and (max-width: 480px) {
    margin: 50px 0 25px 0;
    font-size: 0.9rem;
  }
`;

const GotoBtn = styled.button`
  display: inline-block;
  margin-top: 20px;
  padding: 4px 20px;
  background: #00a4fa;
  color: #fff;
  border: none;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  text-decoration: none;

  @media screen and (max-width: 1024px) {
    margin-top: 40px;
  }
  @media screen and (max-width: 480px) {
    margin-top: 20px;
  }
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

  @media screen and (max-width: 1024px) {
    flex-direction: row;
    left: 50%;
    top: 31rem;
  }

  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ThumbText = styled.p`
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const ThumbLine = styled.li`
  list-style: none;
  display: inline-block;
  margin: 15px 0;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: translateY(-15px);
  }

  @media screen and (max-width: 1024px) {
    margin: 0 30px;
  }
`;

const ThumbImg = styled.img`
  width: 50px;
  height: 50px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Home = () => {
  const happy = `${process.env.PUBLIC_URL}/image/happy.png`;
  const nervous = `${process.env.PUBLIC_URL}/image/nervous.png`;
  const surprised = `${process.env.PUBLIC_URL}/image/surprised.png`;

  const [imgSrc, setImgSrc] = useState();
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Container>
        <Circle>
          <CheckImg
            src={`${process.env.PUBLIC_URL}/image/Check.png`}
            alt='check_img'
          />
          <MainImg src={imgSrc || happy} alt='happy' />
        </Circle>
        <TextBox>
          <Description>
            Do it Now,
            <br />
            <PrimaryDesc>Survey!</PrimaryDesc>
          </Description>
          <Explanation>
            설문을 작성해보세요,
            <br />
            개인과 기업의 리서치를 모아드립니다.
            <br />
            설문을 응답해보세요,
            <br />
            각자의 응답이 모여 더 개선된 환경을 만들어 낼 수 있습니다!
            <br /> 직관적인 결과를 바로 확인해보실 수 있습니다.
          </Explanation>
          <GotoBtn onClick={() => navigate("/survey")}>설문하러가기</GotoBtn>
        </TextBox>
        <Thumb>
          <ThumbText>Click Here!</ThumbText>
          <ThumbLine>
            <ThumbImg
              src={happy}
              alt='happy'
              onClick={() => setImgSrc(happy)}
            />
          </ThumbLine>
          <ThumbLine>
            <ThumbImg
              src={nervous}
              alt='nervous'
              onClick={() => setImgSrc(nervous)}
            />
          </ThumbLine>
          <ThumbLine>
            <ThumbImg
              src={surprised}
              alt='surprise'
              onClick={() => setImgSrc(surprised)}
            />
          </ThumbLine>
        </Thumb>
      </Container>
    </>
  );
};

export default Home;
