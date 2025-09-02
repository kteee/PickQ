import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useHttpClient } from "../hooks/http-hook";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "../styles/swal-custom.css";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const hasHandled = useRef(false);
  const { error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    if (hasHandled.current) return;

    const handleOAuthRedirect = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const userId = params.get("userId");
      const isNew = params.get("isNew") === "true";

      if (token) {
        if (!isNew) {
          // 기존 유저
          auth.login(userId, token);
          hasHandled.current = true;
          navigate("/", { replace: true });
        } else {
          // 신규 유저
          const result = await Swal.fire({
            title: "약관 동의",
            html: `
            <div style="text-align: left; font-size: 14px">
            <p>
                <input type="checkbox" id="ageCheck" />
                <label for="ageCheck">
                    (필수) 만 14세 이상입니다.
                </label>
            </p>
            <p>
                <input type="checkbox" id="termsCheck" />
                <label for="termsCheck">(필수) 
                    <a href="/terms" target="_blank" rel="noopener noreferrer" class="swal-link">이용약관</a> 및 
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" class="swal-link">개인정보처리방침</a>에 동의합니다.
                </label>
            </p>
            </div>
            `,
            showCancelButton: true,
            confirmButtonText: "동의",
            cancelButtonText: "취소",
            confirmButtonColor: "rgb(80, 188, 255)",
            cancelButtonColor: "#b1b1b1",
            focusConfirm: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
              title: "swal-big-title",
              htmlContainer: "swal-text",
              confirmButton: "swal-confirm",
              cancelButton: "swal-cancel",
            },

            preConfirm: () => {
              const ageCheck = document.getElementById("ageCheck");
              const termsCheck = document.getElementById("termsCheck");
              if (!ageCheck.checked || !termsCheck.checked) {
                Swal.showValidationMessage("모든 필수 항목에 동의해야 합니다.");
                return false;
              }
              return true;
            },
          });

          if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/login", { replace: true });
            return;
          }

          if (result.isConfirmed) {
            try {
              const decoded = jwtDecode(token);
              const { email, nickname, googleId } = decoded;

              const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/oauth/signup`,
                "POST",
                JSON.stringify({ googleId, email, nickname }),
                { "Content-Type": "application/json" }
              );

              // 로그인 처리
              auth.login(responseData.data.userId, responseData.data.token);
              hasHandled.current = true;
              navigate("/", { replace: true });
            } catch (err) {
              console.error(err);
            }
          }
        }
      } else {
        navigate("/login", { replace: true });
      }
    };

    handleOAuthRedirect();
  }, [auth, navigate, sendRequest]);

  return null;
};

export default OAuth2RedirectHandler;
