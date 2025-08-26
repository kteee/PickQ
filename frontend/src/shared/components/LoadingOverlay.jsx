import styled, { keyframes } from "styled-components";

const LoadingOverlay = () => {
  return (
    <Overlay>
      <DotsLoader>
        <Dot $delay="0s" />
        <Dot $delay="0.2s" />
        <Dot $delay="0.4s" />
      </DotsLoader>
    </Overlay>
  );
};

export default LoadingOverlay;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const DotsLoader = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  animation: ${bounce} 1.2s infinite ease-in-out;
  animation-delay: ${(props) => props.$delay};
`;
