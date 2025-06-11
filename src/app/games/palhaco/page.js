"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Timer from "@/components/timer";
import { ArrowLeft } from "lucide-react";
import { SaveGame } from "@/components/save-game";

export default function Burro() {
    const [playerName, setPlayerName] = useState("");
    const [playerContact, setPlayerContact] = useState("");
    const [timeElapsed, setTimeElapsed] = useState(0); // em milissegundos
    const [selectedPoints, setSelectedPoints] = useState(null);

    const pointOptions = [
        { value: 1, label: "1 acerto ⭐" },
        { value: 2, label: "2 acertos ⭐⭐" },
        { value: 3, label: "3 acertos ⭐⭐⭐" },
        { value: 4, label: "4 acertos ⭐⭐⭐⭐" },
        { value: 5, label: "5 acertos ⭐⭐⭐⭐⭐" },
    ];

    return (
        <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
            <Link
                href="/"
                className="flex gap-2 items-center text-zinc-500 hover:text-zinc-700 transition"
            >
                <ArrowLeft size={16} />
                <span>Voltar à página inicial</span>
            </Link>

            <h1 className="text-3xl font-bold text-zinc-800">
                Novo jogo do palhaço 🤡
            </h1>

            <form className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="playerName">👤 Nome do jogador:</Label>
                    <Input
                        id="playerName"
                        type="text"
                        placeholder="ex: Joazinho 3a"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="playerContact">
                        📞 Contato do jogador:
                    </Label>
                    <Input
                        id="playerContact"
                        type="text"
                        placeholder="ex: Telefone ou Email"
                        value={playerContact}
                        onChange={(e) => setPlayerContact(e.target.value)}
                    />
                </div>
            </form>

            <div className="mt-4">
                <Timer
                    timeElapsed={timeElapsed}
                    setTimeElapsed={setTimeElapsed}
                />
            </div>

            <div className="grid gap-2 mt-6">
                <Label>Pontuação:</Label>
                <div className="flex flex-wrap gap-2">
                    {pointOptions.map((option) => (
                        <Button
                            key={option.value}
                            className={`${
                                selectedPoints === option.value
                                    ? "border-green-400"
                                    : ""
                            }`}
                            variant={"outline"}
                            onClick={() => setSelectedPoints(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <SaveGame
                    gameData={{
                        selectedPoints,
                        timeElapsed,
                        playerName,
                        playerContact,
                    }}
                />
            </div>
        </div>
    );
}
