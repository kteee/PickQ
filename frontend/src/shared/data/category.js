export const CATEGORY_LABELS = {
  all: "전체",
  quiz: "퀴즈",
  psytest: "심리테스트",
};

export const CATEGORIES = [
  { label: CATEGORY_LABELS.all, value: "all" },
  { label: CATEGORY_LABELS.quiz, value: "quiz" },
  { label: CATEGORY_LABELS.psytest, value: "psytest" },
];

export const getCategoryLabel = (value) => CATEGORY_LABELS[value] ?? value;
