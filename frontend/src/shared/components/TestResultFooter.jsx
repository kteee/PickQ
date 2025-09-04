import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import KakaoShareButton from "./KakaoShareButton";

const QuizResultFooter = ({ id, title, image }) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        $backgroundColor="#b12af0"
        onClick={() => {
          navigate(`/quiz/${id}`);
        }}
      >
        다시하기
      </Button>
      <Button
        $backgroundColor="rgb(92, 195, 255)"
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </Button>
      <ResultShare>
        <div>카카오톡 공유하기</div>
        <KakaoShareButton title={title} image={image} />
      </ResultShare>
    </>
  );
};

export default QuizResultFooter;

const Button = styled.button`
  font-size: 19px;
  font-weight: 600;
  width: 100%;
  margin-top: 13px;
  padding: 14px 0;
  background-color: ${(props) => props.$backgroundColor || "#b0e9ff"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  @media (max-width: 640px) {
    font-size: 16px;
    padding: 13px 0;
  }
`;

const ResultShare = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50px;
  gap: 20px;
  margin-top: 65px;
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 500;
  color: #585858;

  @media (max-width: 640px) {
    gap: 15px;
    margin-top: 55px;
  }
`;
