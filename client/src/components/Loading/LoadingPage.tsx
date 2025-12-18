"use client"
import { Badge } from "@/components/ui/badge"
import { SpinnerLoading } from "./SpinnerLoading"

export function LoadingPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <SpinnerLoading />
        Aguarde...
    </div>
  )
}
