import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BiPencil } from "react-icons/bi";
import { Textarea } from "../ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { editComment } from "@/api/posts";
import { useAuthContext } from "@/contexts/AuthContext";

interface IDialogsProps {
    content: string;
    ID: number
}

export function Dialogs({ content, ID }: IDialogsProps) {
    const [value, setValue] = useState<string>(content);
    const { token } = useAuthContext();

    // Editar comentário
    const handleEdit = async () => {
        if (!value.trim()) return;
        const res = await editComment(ID, value, token);
        console.log(res);
    }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" className="cursor-pointer justify-start items-start">
            <BiPencil />
            Editar
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>
            Edição de comentário
          </DialogTitle>
          <DialogHeader>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Comentário</Label>
              <Textarea 
                placeholder="Novo conteúdo..." 
                value={value} onChange={(e) => 
                setValue(e.target.value)} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
                onClick={() => handleEdit()}
                className="cursor-pointer bg-blue-600 hover:bg-blue-700" 
                type="submit">Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
