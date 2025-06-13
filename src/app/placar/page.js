"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SkeletonCard from "@/components/skeleton-card";
import Player from "@/components/player-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Page() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [topPlayers, setTopPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        totalPages: 1,
        itemsPerPage: 9,
    });
    const [error, setError] = useState(null);

    const fetchLeaderboard = async (page = 1) => {
        try {
            page === 1 ? setLoading(true) : setLoadingMore(true);
            setError(null);

            const response = await fetch(
                `/api/leaderboard?page=${page}&limit=${pagination.itemsPerPage}`
            );
            if (!response.ok) throw new Error("Failed to fetch leaderboard");

            const { data, pagination: paginationData } = await response.json();

            setPagination(paginationData);

            console.log(data);

            if (page === 1) {
                setLeaderboard(data);
                setTopPlayers(data.slice(0, 3));
            } else {
                setLeaderboard((prev) => [...prev, ...data]);
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        if (pagination.currentPage < pagination.totalPages) {
            const nextPage = pagination.currentPage + 1;
            fetchLeaderboard(nextPage);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    return (
        <div className="grid items-center justify-items-center min-h-screen p-15">
            <main className="grid gap-8">
                <Link
                    href="/"
                    className="flex gap-2 items-center text-zinc-500 hover:text-zinc-700 transition"
                >
                    <ArrowLeft size={16} />
                    <span>Voltar à página inicial</span>
                </Link>

                <h1 className="text-3xl font-bold">🏆 Placar</h1>

                {/* Erro */}
                {error && (
                    <div className="text-red-500 p-4 bg-red-50 rounded-md">
                        Error: {error}
                    </div>
                )}

                {/* Top 3 Players */}
                {loading && (
                    <section className="lg:flex md:flex flex-wrap grid justify-center gap-6 mb-6">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </section>
                )}
                {topPlayers.length > 0 && (
                    <section className="lg:flex md:flex flex-wrap grid justify-center gap-6 mb-6">
                        {topPlayers.map((player, index) => (
                            <Player
                                key={player.username}
                                variant="topPlayer"
                                player={player}
                                position={index + 1}
                            />
                        ))}
                    </section>
                )}

                <div className="w-full flex justify-center">
                    <hr className="w-3/4" />
                </div>

                {/* Lista completa */}
                {loading ? (
                    <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </section>
                ) : (
                    <>
                        <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                            {leaderboard.map((player, index) => (
                                <Player
                                    key={player.username}
                                    variant="ranking"
                                    position={index + 1}
                                    player={player}
                                />
                            ))}
                        </section>

                        {pagination.currentPage < pagination.totalPages && (
                            <Button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                variant="outline"
                            >
                                {loadingMore
                                    ? "Carregando..."
                                    : "Carregar mais"}
                            </Button>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
