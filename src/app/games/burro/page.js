"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Timer from "@/components/timer"

import { ArrowLeft } from "lucide-react"

export default function Burro() {
    const [selectedPoints, setSelectedPoints] = useState(null)

    const pointOptions = [
        { value: 30, label: "30 Pontos ⭐" },
        { value: 70, label: "70 Pontos ⭐⭐" },
        { value: 100, label: "100 Pontos ⭐⭐⭐" },
    ]

    return (
        <>
            <Link href={"/"} className="flex gap-2 items-center text-zinc-400 transition duration-200 hover:text-zinc-600"><ArrowLeft size={14} /> Voltar a página inicial</Link>

            <h1 className="text-2xl font-bold">Novo jogo do burro 🐴</h1>

            <form className="grid gap-4">
                <div className="grid gap-2">
                    <Label>👤 Nome do jogador:</Label>
                    <Input type="text" placeholder="ex: Joazinho 3a" />
                </div>

                <div className="grid gap-2">
                    <Label>📞 Contato do jogador:</Label>
                    <Input type="text" placeholder="ex: Telefone ou Email" />
                </div>
            </form>

            <Timer limitMs={30000} />

            <div className="grid gap-2 mt-4">
                {pointOptions.map((option) => (
                    <Button
                        key={option.value}
                        variant="outline"
                        onClick={() => setSelectedPoints(option.value)}
                        className={selectedPoints === option.value ? "border-green-500" : ""}
                    >
                        {option.label}
                    </Button>
                ))}
            </div>
        </>
    )
}
