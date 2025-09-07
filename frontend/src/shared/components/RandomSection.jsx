import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RandomSVG from "../assets/RandomSVG";

const RandomSection = ({ loadedTests }) => {
  const navigate = useNavigate();

  const handleRandomQuiz = () => {
    const quizzes = loadedTests.filter((test) => test.category === "quiz");
    if (quizzes.length === 0) return;

    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    navigate(`/quiz/${randomQuiz.shortId}`);
  };

  const handleRandomPsytest = () => {
    const psytest = loadedTests.filter((test) => test.category === "psytest");
    if (psytest.length === 0) return;

    const randomSimtest = psytest[Math.floor(Math.random() * psytest.length)];
    navigate(`/psytest/${randomSimtest.shortId}`);
  };

  return (
    <Wrapper>
      <Box>
        <SubTitle>무엇을 할지 고민중이라면?</SubTitle>
        <BoxInline>
          <BoxText>🎲 고민중인 당신을 위한 랜덤 추천!</BoxText>
          <ButtonGroup>
            <PlayButton onClick={handleRandomQuiz}>
              <RandomSVG />
              랜덤 퀴즈
            </PlayButton>
            <PlayButton onClick={handleRandomPsytest}>
              <RandomSVG />
              랜덤 심테
            </PlayButton>
          </ButtonGroup>
        </BoxInline>
      </Box>
    </Wrapper>
  );
};

export default RandomSection;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 20px auto 20px auto;
  box-sizing: border-box;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  padding: 24px 25px;
  background-color: #f9f9f9;
`;

const SubTitle = styled.div`
  font-size: 19px;
  font-weight: 600;
  color: #2e2e2e;
  margin-top: 3px;
  margin-bottom: 8px;
`;

const BoxInline = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoxText = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const PlayButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 14.5px;
  background-color: #50bcff;
  color: white;
  font-weight: 600;
  border: none;
  padding: 10px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 1px;

  &:hover {
    background-color: #50bcff;
  }
`;
