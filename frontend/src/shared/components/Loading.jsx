import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
      <Text>결과를 제출하고 있습니다.</Text>
    </Wrapper>
  );
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #d3d3d3;
  border-top-color: #b12af0;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #555;
  font-family: "Noto Sans KR", sans-serif;
`;

export default Loading;
