import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "../../shared/styles/swal-custom.css";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../context/auth-context";

const CommentSection = ({ id, isLoggedIn }) => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const auth = useContext(AuthContext);
  const userId = auth.userId;

  const [content, setContent] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const formatTime = (time) => {
    const isoDate = time;
    const localDate = new Date(isoDate);

    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const date = String(localDate.getDate()).padStart(2, "0");
    const hours = String(localDate.getHours()).padStart(2, "0");
    const minutes = String(localDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/comments/${id}`
        );
        setCommentsList(responseData.data);
      } catch (err) {}
    };

    fetchComments();
  }, [id, sendRequest, commentsList]);

  const handleAddComment = async () => {
    if (!content.trim()) return;
    setIsSubmitting(true);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
        "POST",
        JSON.stringify({ userId, content }),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
    setIsSubmitting(false);
    setContent("");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "댓글을 삭제하시겠습니까?",
      width: 340,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "rgb(80, 188, 255)",
      cancelButtonColor: "#b1b1b1",
      customClass: {
        title: "swal-title",
        htmlContainer: "swal-text",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
    });

    if (result.isConfirmed) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
        await Swal.fire({
          title: "댓글이 삭제되었습니다.",
          width: 330,
          confirmButtonText: "확인",
          confirmButtonColor: "rgb(80, 188, 255)",
          customClass: {
            title: "swal-title",
            htmlContainer: "swal-text",
            confirmButton: "swal-confirm",
            cancelButton: "swal-cancel",
          },
        });
      } catch (err) {}
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  if (!commentsList) {
    return null;
  }

  return (
    <Container>
      <Title>댓글 ({commentsList.length})</Title>
      {isLoggedIn ? (
        <InputBox>
          <TextareaInput
            value={content}
            maxLength={500}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력해주세요. (500자 제한)"
          />
          <ButtonWrapper>
            <SubmitButton onClick={handleAddComment} disabled={isSubmitting}>
              {isSubmitting ? (
                <CircularProgress size="18px" color="inherit" />
              ) : (
                "등록"
              )}
            </SubmitButton>
          </ButtonWrapper>
        </InputBox>
      ) : (
        <NotLoggedInBox>로그인 후 댓글을 작성할 수 있습니다.</NotLoggedInBox>
      )}

      {commentsList.length === 0 ? (
        <EmptyBox>
          <EmptyText>아직 댓글이 없습니다.</EmptyText>
          <SubText>첫 번째 댓글을 작성해보세요!</SubText>
        </EmptyBox>
      ) : (
        <CommentList>
          {commentsList.map((c) => (
            <CommentItem key={c.id}>
              <CommentHeader>
                <CommentUser>
                  <UserName>{c.nickname}</UserName>
                  <TimeText>{formatTime(c.createdAt)}</TimeText>
                </CommentUser>
                {c.userId && c.userId._id === userId && (
                  <DeleteIcon
                    onClick={() => handleDelete(c.id)}
                    sx={{ fontSize: 17, color: "#797979", cursor: "pointer" }}
                  ></DeleteIcon>
                )}
              </CommentHeader>
              <CommentContent>{c.content}</CommentContent>
            </CommentItem>
          ))}
        </CommentList>
      )}
    </Container>
  );
};

export default CommentSection;

const Container = styled.div`
  margin-top: 38px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 2px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const TextareaInput = styled.textarea`
  font-size: 14px;
  line-height: 1.5;
  height: 53px;
  background-color: #f5f5f7;
  border: none;
  border-radius: 10px;
  color: #4d4d4d;
  padding: 18px 20px 18px 20px;
  resize: none;
  outline: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  background-color: ${({ disable }) => (disable ? "#acdbf8" : " #50bcff")};
  color: white;
  border: none;
  padding: 5.5px 11px;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 4px;
  cursor: ${({ disable }) => (disable ? "default" : "pointer")};
`;

const NotLoggedInBox = styled.div`
  background-color: #f5f5f7;
  font-size: 14px;
  font-weight: 400;
  height: 53px;
  color: #818181;
  padding: 18px 20px 18px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const EmptyBox = styled.div`
  text-align: center;
  color: #999;
  padding: 25px 0;
`;

const EmptyText = styled.div`
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
`;

const SubText = styled.div`
  font-size: 13px;
  color: #bbb;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 30px;
`;

const CommentItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 14px 16px;
  position: relative;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const TimeText = styled.div`
  font-size: 12px;
  color: #aaa;
`;

const CommentContent = styled.div`
  font-size: 14px;
  color: #333;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`;
