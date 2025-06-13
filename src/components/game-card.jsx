import { CirclePlus, Mail, Timer, User } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { formatTime } from "@/lib/utils";

export default function GameCard({ game }) {
    return (
        <Card className="gap-2">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <p className="font-light text-ring flex items-center gap-2 text-sm">
                        {game.created_at}
                    </p>
                </div>
            </CardHeader>
            <CardContent className="space-y-1">
                {/* <CardContent className="flex md:flex-wrap items-center justify-between gap-4"> */}
                <p className="flex items-center gap-2 font-bold">
                    {game.game === "palhaco" ? "Palhaço 🤡" : "Burro 🐴"}
                </p>
                <p className="font-medium flex items-center gap-2 mb-3">
                    <Timer size={17} />
                    {formatTime(game.duration_ms)}
                </p>
                <p className="flex items-center gap-2">
                    <User size={17} />
                    {game.username || "Visitante"}
                </p>
                <p className="flex items-center gap-2">
                    <Mail size={17} />{game.contact}
                </p>
                <p className="flex items-center gap-2">
                    <CirclePlus size={17} /> Pontos: {game.points}
                </p>
            </CardContent>
        </Card>
    );
}
