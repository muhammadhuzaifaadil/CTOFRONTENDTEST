import { useState, useCallback } from "react";

type Question = {
  questionText: string;
  questionValue: string; // or string | number | boolean | string[] | null, etc.
};

export default function useTemplateQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const addQuestion = useCallback(
    (questionText: string, questionValue: Question["questionValue"]) => {
      setQuestions((prev) => {
        const index = prev.findIndex((q) => q.questionText === questionText);

        // If the question already exists → replace it
        if (index !== -1) {
          const next = [...prev];
          next[index] = { questionText, questionValue };
          return next;
        }

        // Otherwise add a new question
        return [...prev, { questionText, questionValue }];
      });
    },
    []
  );

  return { questions, addQuestion };
}