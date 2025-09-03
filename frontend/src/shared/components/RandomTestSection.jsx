import styled from "styled-components";

import SmallTestCard from "./SmallTestCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RandomTestSection = ({ loadedTests, randomTests, setRandomTests }) => {
  const handleShuffle = () => {
    setRandomTests(getRandomTests(loadedTests, 4));
  };

  const getRandomTests = (arr, n) => {
    if (arr.length <= n) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <Wrapper>
      <RandomSection>
        <SectionHeader>
          <SectionTitle>추천 콘텐츠</SectionTitle>
          <ShuffleButton onClick={handleShuffle}>
            <ShuffleIconSmall>
              <RefreshRoundedIcon
                sx={{ width: 20, height: 20, color: "gray", mt: 0.3 }}
              />
            </ShuffleIconSmall>
            새 추천
          </ShuffleButton>
        </SectionHeader>
        <RandomList>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={23}
            slidesPerView={3}
            navigation
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              800: {
                slidesPerView: 3,
                spaceBetween: 23,
              },
            }}
          >
            {randomTests.map((test) => (
              <SwiperSlide key={test.shortId}>
                <SmallTestCard
                  id={test.shortId}
                  category={test.category}
                  image={test.image}
                  title={test.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </RandomList>
      </RandomSection>
    </Wrapper>
  );
};

export default RandomTestSection;

const Wrapper = styled.div`
  width: 100%;
  height: 340px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 18px;
    max-width: calc(100vw - 18px);
  }

  @media (max-width: 640px) {
    height: auto;
    padding: 0;
    width: 100%;
  }
`;

const RandomSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: 100%;
  align-items: center;
  margin: 0px auto;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  font-size: 21px;
  font-weight: 600;
  color: #2e3238;
  margin-top: 38px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    font-size: 20px;
    font-weight: 600;
    margin-top: 25px;
    margin-bottom: 22px;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 26px;
  font-weight: 600;
  align-items: center;

  @media (max-width: 640px) {
    margin: 0px 12px;
  }
`;

const ShuffleButton = styled.button`
  display: flex;
  align-items: center;
  height: fit-content;
  gap: 1px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 13.5px;
  padding: 3px 11px;
  color: rgb(21, 27, 35);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(209, 213, 219);
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 251);
  }

  @media (max-width: 640px) {
    margin: 0px 12px;
  }
`;

const ShuffleIconSmall = styled.div`
  margin-top: 5px;
`;

const RandomList = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.274);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    top: 105px;
  }

  .swiper-button-prev::after,
  .swiper-button-next::after {
    font-size: 14px;
  }

  .swiper-pagination {
    bottom: 0px;
  }

  .swiper-pagination-bullet {
    background: #4b4b4b;
  }

  .swiper-pagination-bullet-active {
    background: #5cc3ff;
  }

  @media (max-width: 640px) {
    .swiper-button-prev,
    .swiper-button-next {
      top: 150px;
    }
  }
`;
