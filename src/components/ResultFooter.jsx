import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import KakaoShareButton from "./KakaoShareButton";

const ResultFooter = ({ id, title }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        $backgroundColor="#b12af0"
        onClick={() => {
          navigate(`/test/${id}`);
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
        <div>결과 공유하기</div>
        <KakaoShareButton title={title} />
      </ResultShare>
    </>
  );
};

export default ResultFooter;

const Button = styled.button`
  font-family: "Noto Sans KR", sans-serif;
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
  }
`;

const ResultShare = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
  font-size: 16px;
  font-weight: 500;
  color: #7a7a7a;
`;
