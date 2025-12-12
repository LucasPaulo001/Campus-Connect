import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react";

export const XpFields = ({setXp}: { setXp: (v: number) => void }) => {

    const [xpValue, setXpValue] = useState("0");

    useEffect(() => {
        setXp(Number(xpValue));
    }, [xpValue])

    return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Quantidade de XP</label>

      <Select value={xpValue} onValueChange={setXpValue}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Escolha o XP" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5 XP</SelectItem>
          <SelectItem value="10">10 XP</SelectItem>
          <SelectItem value="20">20 XP</SelectItem>
          <SelectItem value="30">30 XP</SelectItem>
          <SelectItem value="50">50 XP</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}