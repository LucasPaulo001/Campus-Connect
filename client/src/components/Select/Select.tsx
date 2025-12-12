import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { XpFields } from "./XPfields/XPfields";
import { QuizFields } from "./QuizFields/QuizFields";

interface ISelectsProps {
  setType: React.Dispatch<React.SetStateAction<string>>;
  setXp: React.Dispatch<React.SetStateAction<number>>;
  setQuiz: React.Dispatch<React.SetStateAction<any>>;
  // setTimer: React.Dispatch<React.SetStateAction<number>>;
}

export function Selects({ setType, setXp, setQuiz }: ISelectsProps) {
  const [type, setLocalType] = React.useState("");

  React.useEffect(() => {
    setType(type);
  }, [type]);

  return (
    <div className="flex flex-col gap-3">
      {/* SELECT DO TIPO */}
      <Select  value={type} onValueChange={setLocalType}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tipo de desafio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo de desafio</SelectLabel>
            <SelectItem value="desafio_xp">Desafio XP</SelectItem>
            <SelectItem value="quiz">Quiz</SelectItem>
            <SelectItem value="timer">Timer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* CAMPOS DINÂMICOS */}
      {type === "desafio_xp" && <XpFields setXp={setXp} />}
      {type === "quiz" && <QuizFields setQuiz={setQuiz} />}
    </div>
  );
}
