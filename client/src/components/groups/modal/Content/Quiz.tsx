"use client";

import { useState } from "react";

interface IQuestion {
  question: string;
  answers: string[];
  correct: number;
}

interface IQuizProps {
  description: string;
  questions: IQuestion[];
  xp: number;
  onAnswer: (questionIndex: number, selectedIndex: number, isCorrect: boolean) => void;
}

export const Quiz = ({ description, questions, xp, onAnswer }: IQuizProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));

  const handleSelect = (qIdx: number, aIdx: number) => {
    const isCorrect = questions[qIdx].correct === aIdx;
    const newSelected = [...selectedAnswers];
    newSelected[qIdx] = aIdx;
    setSelectedAnswers(newSelected);
    onAnswer(qIdx, aIdx, isCorrect);
  };

  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold">{description}</h2>
      {questions.map((q, idx) => (
        <div key={idx} className="border rounded p-4">
          <p className="mb-2 font-medium">{q.question}</p>
          <ul className="flex flex-col gap-2">
            {q.answers.map((opt, aIdx) => (
              <li key={aIdx}>
                <button
                  onClick={() => handleSelect(idx, aIdx)}
                  className={`w-full p-2 rounded border ${
                    selectedAnswers[idx] === aIdx ? "bg-blue-500 text-white" : "bg-transparent"
                  }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <span className="text-sm text-gray-500 mt-2">XP: {xp}</span>
    </div>
  );
};
