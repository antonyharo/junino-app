"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, CirclePlus, Mail, Timer, User } from "lucide-react";
import { formatTime } from "@/lib/utils";

export function SaveGame({ points, durationMs, username, contact, game }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const result = {
                username,
                contact,
                durationMs,
                game,
                points,
            };

            const response = await fetch("/api/save-game", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result),
            });

            const data = await response.json();

            if (response.ok) {
                toast("Partida salva com sucesso!");
                setOpen(false); // fecha o dialog após sucesso
            } else {
                console.error(data.error);
                toast("Oooops! Um erro ocorreu ao salvar sua partida...");
            }
        } catch (error) {
            console.error(error);
            toast("Um erro ocorreu ao salvar sua partida...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                            Salvando...
                        </>
                    ) : (
                        <>Salvar</>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Salvar resultado</DialogTitle>
                    <DialogDescription>
                        Confira os dados da partida e salve seu resultado.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <p>
                        <strong className="flex items-center gap-2">
                            <User size={16} /> Nome:
                        </strong>{" "}
                        {username || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                    <p>
                        <strong className="flex items-center gap-2">
                            <Mail size={16} /> Contato:
                        </strong>{" "}
                        {contact || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                    <p>
                        <strong className="flex items-center gap-2">
                            <CirclePlus size={16} /> Pontuação:
                        </strong>{" "}
                        {points ?? (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                    <p>
                        <strong className="flex items-center gap-2">
                            <Timer size={16} /> Tempo:
                        </strong>{" "}
                        {formatTime(durationMs) || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={loading}>
                            Cancelar
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                    Salvando...
                                </>
                            ) : (
                                <>Salvar</>
                            )}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
