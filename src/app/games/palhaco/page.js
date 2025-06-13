"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Timer from "@/components/timer";
import { ArrowLeft, Mail, User } from "lucide-react";
import { SaveGame } from "@/components/save-game";

export default function Burro() {
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [durationMs, setDurationMs] = useState(0); // em milissegundos
    const [points, setPoints] = useState(null);

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
                    <Label htmlFor="username">
                        <User size={16} /> Nome do jogador:
                    </Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="ex: Joazinho 3a"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="contact">
                        <Mail size={16} /> Contato do jogador:
                    </Label>
                    <Input
                        id="contact"
                        type="text"
                        placeholder="ex: Telefone ou Email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
            </form>

            <div className="mt-4">
                <Timer durationMs={durationMs} setDurationMs={setDurationMs} />
            </div>

            <div className="grid gap-2 mt-6">
                <Label>Pontuação:</Label>
                <div className="flex flex-wrap gap-2">
                    {pointOptions.map((option) => (
                        <Button
                            key={option.value}
                            className={`${
                                points === option.value
                                    ? "border-green-400"
                                    : ""
                            }`}
                            variant={"outline"}
                            onClick={() => setPoints(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="pt-6">
                <SaveGame
                    points={points}
                    durationMs={durationMs}
                    username={username}
                    contact={contact}
                    game="palhaco"
                />
            </div>
        </div>
    );
}
