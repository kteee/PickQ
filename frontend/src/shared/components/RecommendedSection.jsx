import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SmallTestCard from "./SmallTestCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const RecommendedSection = ({ recommendedTests }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigation = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  useEffect(() => {
    console.log(recommendedTests);
    const swiper = swiperRef.current;
    if (swiper && swiper.params && prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
      updateNavigation(swiper);

      swiper.on("slideChange", () => updateNavigation(swiper));
      console.log(recommendedTests);
    }
  }, [recommendedTests]);

  return (
    <Wrapper>
      <RandomSection>
        <SectionHeader>
          <HeaderLeft>
            <SectionTitle>이번주 추천 콘텐츠</SectionTitle>
          </HeaderLeft>
          <HeaderRight>
            <NavButton ref={prevRef} disabled={isBeginning}>
              {"<"}
            </NavButton>
            <NavButton ref={nextRef} disabled={isEnd}>
              {">"}
            </NavButton>
          </HeaderRight>
        </SectionHeader>
        <RandomList>
          <AnimatePresence mode="wait">
            <motion.div
              key={JSON.stringify(recommendedTests)}
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
                  820: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 25,
                  },
                  1000: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 25,
                  },
                }}
              >
                {recommendedTests.map((test) => (
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

export default RecommendedSection;

const Wrapper = styled.div`
  width: 100%;
  height: 260px;
  margin-top: 45px;
  margin-bottom: 28px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    max-width: 100vw;
  }

  @media (max-width: 640px) {
    margin-top: 15px;
    margin-bottom: 5px;
    height: auto;
  }
`;

const RandomSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  height: 100%;
  margin: 0px auto;

  @media (max-width: 1000px) {
    padding: 0 18px;
    margin: 0px;
  }

  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  gap: 10px;
  font-size: 21px;
  font-weight: 600;
  color: #2e3238;
  margin-bottom: 21px;

  @media (max-width: 640px) {
    margin-top: 8px;
    margin-bottom: 18px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 23px;
  font-weight: 600;
  align-items: center;

  @media (max-width: 640px) {
    font-size: 23px;
    font-weight: 600;
  }
`;

const NavButton = styled.button`
  box-sizing: content-box;
  width: 27px;
  height: 28px;
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

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  @media (max-width: 640px) {
    display: none;
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
