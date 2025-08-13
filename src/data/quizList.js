import QuizImg01 from "../assets/quiz01.png";
import QuizImg02 from "../assets/quiz02.png";
import QuizImg03 from "../assets/quiz03.png";
import QuizImg04 from "../assets/quiz04.png";
import QuizImg05 from "../assets/quiz05.png";
import QuizImg06 from "../assets/quiz06.png";

export const QUIZ_TYPE = {
  MULTIPLE_CHOICE: "객관식",
  SUBJECTIVE: "주관식",
};

export const quizList = [
  {
    id: 1,
    category: "퀴즈",
    title: "중학생 수준의 일반상식 퀴즈모음!",
    subject: "일반상식",
    count: 10,
    image: QuizImg01,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 2,
    category: "퀴즈",
    title: "알아두면 쓸모있는 일반상식 퀴즈모음",
    subject: "일반상식",
    count: 20,
    image: QuizImg02,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 3,
    category: "퀴즈",
    title: "한국인이라면 무조건 알아야 할 역사상식",
    subject: "역사상식",
    count: 20,
    image: QuizImg03,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 4,
    category: "퀴즈",
    title: "초성으로 영화 제목 맞히기",
    subject: "영화초성",
    count: 10,
    image: QuizImg04,
    type: QUIZ_TYPE.SUBJECTIVE,
  },
  {
    id: 5,
    category: "퀴즈",
    title: "당신의 맞춤법 실력을 테스트해보세요!",
    subject: "맞춤법퀴즈",
    count: 10,
    image: QuizImg05,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 6,
    category: "퀴즈",
    title: "일상에서 쓰는 사자성어, 얼마나 알고 있나요?",
    subject: "추억의퀴즈",
    count: 10,
    image: QuizImg06,
    type: QUIZ_TYPE.SUBJECTIVE,
  },
];

export default quizList;
