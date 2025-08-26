import { useEffect } from "react";
import styled from "styled-components";

const Snackbar = ({ error, onClose }) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, onClose]);

  if (!error) return null;

  return (
    <>
      <Overlay onClick={onClose} />
      <SnackbarWrapper>
        <Message>{error}</Message>
      </SnackbarWrapper>
    </>
  );
};

export default Snackbar;

const SnackbarWrapper = styled.div`
  position: fixed;
  width: 300px;
  top: 40px;
  right: 30px;
  border: 1px solid rgb(168, 203, 255);
  background-color: rgb(255, 255, 255);
  color: rgb(34, 34, 34);
  padding: 14px 20px;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  box-shadow: rgba(0, 0, 0, 0.063) 0px 5px 5px 0px;
  z-index: 9999;
  font-size: 14px;
`;

const Message = styled.span``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
`;
