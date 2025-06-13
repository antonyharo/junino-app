"use client";

import { useState, useEffect } from "react";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const LIMIT = 9;

    useEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = async () => {
        setPage(1);
        setRecentGames([]);
        setHasMore(true);
        setIsSearching(false);
        await fetchGames(1);
    };

    const fetchGames = async (pageNumber, search = "") => {
        try {
            if (pageNumber === 1) setLoading(true);
            else setLoadingMore(true);

            setError(null);

            const params = new URLSearchParams({
                page: pageNumber.toString(),
                limit: LIMIT.toString(),
            });

            if (search) params.append("search", search);

            const res = await fetch(`/api/recent-games?${params.toString()}`);

            if (!res.ok) throw new Error("Erro ao buscar partidas");

            const responseData = await res.json();

            if (responseData.data.length < LIMIT) setHasMore(false);

            setRecentGames((prev) =>
                pageNumber === 1
                    ? responseData.data
                    : [...prev, ...responseData.data]
            );
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchGames(nextPage, isSearching ? searchTerm : "");
    };

    const handleSearch = () => {
        setPage(1);
        setHasMore(true);
        setIsSearching(true);
        setRecentGames([]);
        fetchGames(1, searchTerm);
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        getInitialData();
    };

    return (
        <div className="grid items-center justify-items-center min-h-screen p-15">
            <main className="grid gap-8">
                <h1 className="text-3xl font-bold text-center">
                    🎉 Festa Junina do 3a! 🎉
                </h1>

                <div className="grid gap-3 place-items-center">
                    <Link href="/games/palhaco">
                        <Button variant="outline">
                            Novo jogo do Palhaço 🤡
                        </Button>
                    </Link>
                    <Link href="/games/burro">
                        <Button variant="outline">Novo jogo do Burro 🐴</Button>
                    </Link>
                    <Link href="/placar">
                        <Button variant="outline">Ver Placar 🏆</Button>
                    </Link>
                </div>

                {error && <div className="text-red-500">Erro: {error}</div>}

                <h2 className="text-2xl font-bold text-center">
                    📅 Partidas Recentes
                </h2>

                {/* Busca */}
                <div className="flex gap-2 items-center justify-center">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou contato..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-3 py-2 rounded-md w-64"
                    />
                    <Button
                        // variant="outline"
                        onClick={handleSearch}
                        disabled={!searchTerm}
                    >
                        Pesquisar
                    </Button>
                    {isSearching && (
                        <Button variant="ghost" onClick={handleClearSearch}>
                            Limpar
                        </Button>
                    )}
                </div>

                {loading && (
                    <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </section>
                )}

                {!loading && recentGames.length === 0 && (
                    <div className="text-center">
                        Nenhum resultado encontrado.
                    </div>
                )}

                {recentGames.length > 0 && (
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
