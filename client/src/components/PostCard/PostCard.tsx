"use clinet";

import { IUser } from "@/types";
import { MouseEventHandler, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Button } from "../ui/button";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";

interface IPostCardProps {
  title: string;
  content: string;
  created_at: string;
  author: IUser;
  postId: number;
}

export const PostCard = ({
  title,
  content,
  created_at,
  author,
  postId,
}: IPostCardProps) => {
  const [like, setLike] = useState(false);
  const { likeInPost } = useActionContext();
  const { token } = useAuthContext();

  const convertDate = () => {
    const isoDate = created_at;
    const date = new Date(isoDate);

    const formatted = date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatted;
  };

  return (
    <div className="bg-white mx-3 md:w-[50%] border rounded-xl shadow-sm p-4 space-y-4">
      <div className="flex justify-between items-center">
        <span className="font-bold">{author.nameUser || author.name}</span>
        <span>{convertDate()}</span>
      </div>
      <hr />
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl">{title}</h2>
        <p>{content}</p>
      </div>
      <hr />
      <div>
        <Button
          variant="ghost"
          onClick={() => {
            setLike((prev) => !prev);
            likeInPost(author.id, postId, token);
          }}
          className="flex cursor-pointer items-center gap-2"
        >
          {like ? (
            <BiSolidLike className="size-6 text-blue-600" />
          ) : (
            <BiLike className="size-6" />
          )}

          <span>{like ? "Curtido" : "Curtir"}</span>
        </Button>
      </div>
    </div>
  );
};
