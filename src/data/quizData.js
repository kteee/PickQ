import QuizImg01 from "../assets/quiz01.png";
import QuizImg02 from "../assets/quiz02.png";
import QuizImg03 from "../assets/quiz03.png";
import QuizImg04 from "../assets/quiz04.png";
import QuizImg05 from "../assets/quiz05.png";
import QuizImg06 from "../assets/quiz06.png";

const quizData = [
  {
    id: 1,
    title: "20문제 중 몇 개 맞추실 수 있나요?",
    image: QuizImg01,
    category: "상식퀴즈",
    subject: "일반상식",
    count: 20,
  },
  {
    id: 2,
    title: "중학생 수준의 일반상식 퀴즈모음!",
    image: QuizImg02,
    category: "상식퀴즈",
    subject: "일반상식",
    count: 20,
  },
  {
    id: 3,
    title: "절반은 꼭 맞춰야할 시사상식!",
    image: QuizImg03,
    category: "상식퀴즈",
    subject: "시사상식",
    count: 10,
  },
  {
    id: 4,
    title: "영화제목, 얼마나 알고 있나요?",
    image: QuizImg04,
    category: "초성퀴즈",
    subject: "영화초성",
    count: 10,
  },
  {
    id: 5,
    title: "당신의 맞춤법 실력을 테스트해보세요!",
    image: QuizImg05,
    category: "국어퀴즈",
    subject: "맞춤법",
    count: 10,
  },
  {
    id: 6,
    title: "90년대생이라면 8개 이상은 맞춰야 합니다!",
    image: QuizImg06,
    category: "추억퀴즈",
    subject: "90년대",
    count: 10,
  },
];

export default quizData;
