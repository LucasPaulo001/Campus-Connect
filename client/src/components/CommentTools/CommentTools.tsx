"use client"

import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BiPencil, BiTrash } from "react-icons/bi"
import { Dialogs } from "../Dialog/Dialog"

interface ICommentToolsProps {
    ID: number,
    content: string
}

export function CommentTools({ ID, content }: ICommentToolsProps) {

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer" variant="ghost" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            <div className="cursor-pointer">
              <BiTrash />
              Excluir 
            </div>
            <div className="cursor-pointer">
              <Dialogs content={content} ID={ID} />
            </div>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
