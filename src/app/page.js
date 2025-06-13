"use client";
import { useState, useEffect } from "react";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/skeleton-card";
import GameCard from "@/components/game-card";
import Link from "next/link";

export default function Page() {
    const [recentGames, setRecentGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const LIMIT = 9;

    useEffect(() => {
        const getInitialData = async () => {
            try {
                setLoading(true);
                setError(null);

                await fetchGames(1);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getInitialData();
    }, []);

    const fetchGames = async (page) => {
        try {
            setLoadingMore(true);
            setError(null);

            const res = await fetch(
                `/api/recent-games?page=${page}&limit=${LIMIT}`
            );
            if (!res.ok) throw new Error("Failed to fetch recent games");

            const responseData = await res.json();

            if (responseData.data.length < LIMIT) {
                setHasMore(false);
            }

            setRecentGames((prev) => [...prev, ...responseData.data]);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchGames(nextPage);
    };

    return (
        <div className="grid items-center justify-items-center min-h-screen p-15">
            <main className="grid gap-8">
                <h1 className="text-2xl font-bold text-center">
                    Festa Junina do 3a! 🎉🥳
                </h1>
                <div className="grid gap-3 place-items-center">
                    <Link href="/games/palhaco">
                        <Button variant="outline">
                            Novo jogo do palhaço 🤡
                        </Button>
                    </Link>

                    <Link href="/games/burro">
                        <Button variant="outline">Novo jogo do burro 🐴</Button>
                    </Link>
                </div>

                {/* Mensagem de erro */}
                {error && <div className="text-red-500">Error: {error}</div>}

                <h1 className="flex items-center gap-3 text-2xl font-semibold">
                    <Calendar /> Partidas Recentes
                </h1>

                {loading && (
                    <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </section>
                )}

                {recentGames && (
                    <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {recentGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </section>
                )}

                {hasMore && !loading && (
                    <Button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        variant="outline"
                    >
                        {loadingMore ? "Carregando..." : "Carregar mais"}
                    </Button>
                )}
            </main>
        </div>
    );
}
