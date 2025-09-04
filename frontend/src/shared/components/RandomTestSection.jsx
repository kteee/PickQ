import { useEffect, useRef } from "react";
import styled from "styled-components";
import SmallTestCard from "./SmallTestCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RandomTestSection = ({ loadedTests, randomTests, setRandomTests }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const handleShuffle = () => {
    setRandomTests(getRandomTests(loadedTests, 4));
  };

  const getRandomTests = (arr, n) => {
    if (arr.length <= n) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [randomTests]);

  return (
    <Wrapper>
      <RandomSection>
        <SectionHeader>
          <HeaderLeft>
            <SectionTitle>추천 콘텐츠</SectionTitle>
          </HeaderLeft>
          <HeaderRight>
            <ShuffleButton onClick={handleShuffle}>
              <RefreshRoundedIcon
                sx={{ width: 18, height: 18, color: "gray", mt: 0.5 }}
              />
            </ShuffleButton>
            <NavButton ref={prevRef}>{"<"}</NavButton>
            <NavButton ref={nextRef}>{">"}</NavButton>
          </HeaderRight>
        </SectionHeader>
        <RandomList>
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(randomTests)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ height: "100%" }}
            >
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={23}
                slidesPerView={3.2}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
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

                  1000: {
                    slidesPerView: 3.3,
                    spaceBetween: 25,
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
            </motion.div>
          </AnimatePresence>
        </RandomList>
      </RandomSection>
    </Wrapper>
  );
};

export default RandomTestSection;

const Wrapper = styled.div`
  width: 100%;
  height: 250px;
  margin-top: 40px;
  margin-bottom: 28px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 18px;
  }

  @media (max-width: 640px) {
    height: auto;
    padding: 0;
    width: 100%;
    margin-top: 5px;
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
  margin-bottom: 27px;

  @media (max-width: 640px) {
    font-size: 20px;
    font-weight: 600;
    margin-top: 25px;
    margin-bottom: 22px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  align-items: center;

  @media (max-width: 640px) {
    margin-left: 14px;
    font-size: 22px;
  }
`;

const ShuffleButton = styled.button`
  box-sizing: content-box;
  width: 25px;
  height: 25px;
  padding: 2px;
  background-color: rgb(255, 255, 255);
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: rgb(248, 248, 251);
  }

  @media (max-width: 640px) {
    margin-right: 14px;
  }
`;

const NavButton = styled.button`
  box-sizing: content-box;
  width: 26px;
  height: 26px;
  padding: 0px 1px 3px 1px;
  font-size: 18px;
  background: rgb(255, 255, 255);
  border: 1px solid lightgray;
  border-radius: 8px;
  color: gray;
  cursor: pointer;

  &:hover {
    background: rgb(248, 248, 251);
  }
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

    .swiper-pagination {
      bottom: 10px;
    }
  }
`;
