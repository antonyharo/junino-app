import { CircleCheck, CircleX, Timer, User } from "lucide-react";
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
            <CardContent className="flex md:flex-wrap items-center justify-between gap-4">
                <p className="flex items-center gap-2">
                    <User size={20} />
                    {game.username || "Visitante"}
                </p>
                <p>{game.contact}</p>
                <p>{game.game}</p>
                <p>{game.points}</p>
                <p className="font-bold flex items-center gap-1">
                    <Timer size={20} />
                    {formatTime(game.duration_ms)}
                </p>
            </CardContent>
        </Card>
    );
}
