import { useEffect } from "react";
import styled from "styled-components";
const { Kakao } = window;

const KakaoShareButton = ({ title }) => {
  const resultUrl = window.location.href;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("2154c12863d67bafcf69ed39ac675a7f");
    }

    Kakao.Share.createDefaultButton({
      container: "#kakaotalk-share-btn",
      objectType: "feed",
      content: {
        title: `${title} 결과`,
        description: "지금 바로 피큐에 접속하여 결과를 확인해보세요!",
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "결과 확인하기",
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
      ],
    });
  }, [title, resultUrl]);

  return (
    <KakaoImg
      id="kakaotalk-share-btn"
      src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
      alt="카카오톡 공유하기"
    />
  );
};

export default KakaoShareButton;

const KakaoImg = styled.img`
  height: 100%;
  cursor: pointer;
`;
