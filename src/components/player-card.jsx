import { Timer, Trophy, User, CirclePlus } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { formatTime } from "@/lib/utils";

export default function PlayerCard({ player, variant, position }) {
    const trophyColor =
        position === 1
            ? "text-yellow-400"
            : position === 2
            ? "text-gray-400"
            : "text-amber-600";

    return (
        <Card className="grid gap-2">
            <CardHeader>
                {variant === "topPlayer" ? (
                    <p className="flex items-center gap-2.5 font-bold">
                        <Trophy size={17} className={trophyColor} />
                        Top {position}°
                    </p>
                ) : (
                    <div className="flex items-center gap-2">
                        <p className="flex items-center gap-2.5 font-bold">
                            #{position}
                        </p>
                    </div>
                )}
            </CardHeader>

            <CardContent className="flex flex-col gap-2">
                <p className="flex items-center gap-2">
                    <User size={18} />
                    {player.username || "Anonymous"}
                </p>

                <p className="flex items-center gap-2">
                    <Timer size={18} />
                    {formatTime(player.totalTime)}
                </p>

                <p className="flex items-center gap-2">
                    <CirclePlus size={18} />
                    Pontos: {player.totalPoints}
                </p>
            </CardContent>
        </Card>
    );
}
