import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IComment } from "@/types"
import { Send } from "lucide-react"
import React from "react";

interface IFormResProps {
    comment: IComment;
    openSend: number;
    setOpenSend: React.Dispatch<React.SetStateAction<number | null>>
}

export const FormResponse = ({ setOpenSend, comment, openSend }: IFormResProps) => {
    return(
        <div className="flex w-full gap-3">
            <Input
                placeholder={`Sua resposta para ${comment.User.name}`}
            />

            <Button variant={"outline"} className="cursor-pointer">
                <Send />
            </Button>
        </div>
    )
}