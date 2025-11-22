"use client";

import Image from "next/image";

interface INotFoundProps {
  text: string;
}

export const NotFound = ({ text }: INotFoundProps) => {
  return (
    <div className="flex flex-col h-100 justify-center items-center">
      <span className="text-18px md:text-2xl text-gray-500">
        {text}
      </span>
      <Image
        src={"/nothing.png"}
        alt="qualquer coisa"
        width={350}
        height={350}
      />
    </div>
  );
};
