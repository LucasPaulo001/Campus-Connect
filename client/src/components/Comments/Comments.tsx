"use client";

import { FiSend } from "react-icons/fi";
import { GrSend } from "react-icons/gr";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaRegCommentDots } from "react-icons/fa";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Spinner } from "../ui/spinner";
import { createComents } from "@/api/posts";
import { useState } from "react";
import { LiaCommentsSolid } from "react-icons/lia";
import { CardComment } from "./cardComment/CardComment";


interface ICommentsProps {
  post_id: string;
}

export function Comments({ post_id }: ICommentsProps) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const { listComments, comment } = useActionContext();
  const { token } = useAuthContext();


  // Criar comentário
  const handleSend = async () => {
    setSending(true);
    try {
      if (!text.trim()) return;

      await createComents(text, post_id, token);
      await listComments(post_id, token);

      setText("");
    } finally {
      setSending(false);
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={async (isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setLoadingComments(true);
          await listComments(post_id, token);

          setLoadingComments(false);
        }
      }}
    >
      <DrawerTrigger asChild>
        <div className="cursor-pointer flex gap-1.5">
          <FaRegCommentDots className="size-5" />
        </div>
      </DrawerTrigger>

      <DrawerContent className="p-0">
        {/* Header */}
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-lg flex gap-1.5 justify-center items-center font-semibold">
            Comentários
            <LiaCommentsSolid className="size-6" />
          </DrawerTitle>
        </DrawerHeader>

        {/* Lista scrollável */}
        <div className="h-[60vh] overflow-y-auto px-4 py-3 space-y-4">
          {loadingComments ? (
            <div className="flex h-full gap-2.5 justify-center items-center">
              <Spinner className="size-8 text-blue-500" />
              <span>Carregando</span>
            </div>
          ) : (
            <>
              {comment?.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhum comentário ainda.
                </p>
              )}

              {comment?.map((c) => (
                <CardComment key={c.id} author={c.author} comment={c} content={c.content} createdAt={c.createdAt} id={c.id} liked={c.liked} likes={c.likes} postId={post_id} />
              ))}
            </>
          )}
        </div>

        {/* Caixa de comentários fixa embaixo */}
        <div className="border-t p-3 flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva um comentário..."
            className="flex-1 bg-muted p-2 rounded-md outline-none"
          />

          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? <GrSend /> : <FiSend className="size-5" />}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
