import Img01 from "../assets/quiz01.png";
import Img02 from "../assets/quiz02.png";
import Img03 from "../assets/quiz03.png";
import Img04 from "../assets/quiz04.png";
import Img05 from "../assets/quiz05.png";
import Img06 from "../assets/quiz06.png";
import Img07 from "../assets/test01.png";
import Img08 from "../assets/test02.png";

export const QUIZ_TYPE = {
  MULTIPLE_CHOICE: "객관식",
  SUBJECTIVE: "주관식",
};

export const testList = [
  {
    id: 1,
    category: "퀴즈",
    title: "상식퀴즈(1)",
    description: "중학생 수준의 일반상식 퀴즈모음!",
    subject: "일반상식",
    image: Img01,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 2,
    category: "퀴즈",
    title: "상식퀴즈(2)",
    description: "알아두면 쓸모있는 일반상식 퀴즈모음",
    subject: "일반상식",
    image: Img02,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 3,
    category: "퀴즈",
    title: "상식퀴즈(3)",
    description: "한국인이라면 무조건 알아야 할 역사상식",
    subject: "역사상식",
    image: Img03,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 4,
    category: "퀴즈",
    title: "영화 초성퀴즈",
    description: "초성으로 영화 제목 맞히기",
    subject: "초성",
    image: Img04,
    type: QUIZ_TYPE.SUBJECTIVE,
  },
  {
    id: 5,
    category: "퀴즈",
    title: "맞춤법 퀴즈",
    description: "당신의 맞춤법 실력을 테스트해보세요!",
    subject: "맞춤법",
    image: Img05,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 6,
    category: "퀴즈",
    title: "사자성어 퀴즈",
    description: "일상에서 쓰는 사자성어, 얼마나 알고 있나요?",
    subject: "사자성어",
    image: Img06,
    type: QUIZ_TYPE.SUBJECTIVE,
  },
  {
    id: 7,
    category: "심리테스트",
    title: "테토남/에겐남 테스트",
    description: "테토남/에겐남 나는 어떤 유형?",
    subject: "성격",
    image: Img07,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
  {
    id: 8,
    category: "심리테스트",
    title: "테토녀/에겐녀 테스트",
    description: "테토녀/에겐녀 나는 어떤 유형?",
    subject: "성격",
    image: Img08,
    type: QUIZ_TYPE.MULTIPLE_CHOICE,
  },
];

export default testList;
