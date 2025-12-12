import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function QuizFields({ setQuiz }: { setQuiz: (q: any) => void }) {
  const [questions, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState<number>(-1);

  useEffect(() => {
    setQuiz({
      questions: [
        {
          question: questions,
          answers: options,
          correct: answer,
        },
      ],
    });
  }, [questions, options, answer]);

  function updateOption(i: number, v: string) {
    const newOptions = [...options];
    newOptions[i] = v;
    setOptions(newOptions);
  }

  return (
    <div className="flex flex-col gap-2 p-3 border rounded-lg">
      <label className="text-sm font-medium">Pergunta</label>
      <Input
        placeholder="Digite a pergunta"
        value={questions}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <label className="text-sm font-medium mt-2">Alternativas</label>

      {options.map((opt, i) => (
        <Input
          key={i}
          placeholder={`Opção ${i + 1}`}
          value={opt}
          onChange={(e) => updateOption(i, e.target.value)}
        />
      ))}

      <label className="text-sm font-medium mt-2">Resposta correta</label>

      <div className="flex gap-2">
        {options.map((_, i) => (
          <Button
            key={i}
            type="button"
            variant={answer === i ? "default" : "outline"}
            onClick={() => setAnswer(i)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}
