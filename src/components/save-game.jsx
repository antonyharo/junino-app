import { Button } from "@/components/ui/button";
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
import { formatTime } from "@/lib/utils";

export function SaveGame({ gameData }) {
    // selectedPoints,
    // timeElapsed,
    // playerName,
    // playerContact,
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Salvar</Button>
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
                        <strong>👤 Nome:</strong>{" "}
                        {gameData.playerName || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                    <p>
                        <strong>📞 Contato:</strong>{" "}
                        {gameData.playerContact || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                    <p>
                        <strong>⭐ Pontuação:</strong>{" "}
                        {gameData.selectedPoints || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                    <p>
                        <strong>⏱️ Tempo:</strong>{" "}
                        {formatTime(gameData.timeElapsed) || (
                            <span className="ml-1 text-zinc-500">
                                Sem informações
                            </span>
                        )}
                    </p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
