import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are not set.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const offset = (page - 1) * limit;

        // Buscar dados da tabela
        const { data: gameData, error } = await supabase
            .from("game_history")
            .select("username, duration_ms, points");

        if (error) {
            console.error("Supabase error:", error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!gameData || gameData.length === 0) {
            return NextResponse.json(
                { data: [], pagination: {} },
                { status: 200 }
            );
        }

        // Agrupar por usuário (soma dos pontos e do tempo)
        const userStatsMap = new Map();

        gameData.forEach(({ username, duration_ms, points }) => {
            if (!username) return;

            if (!userStatsMap.has(username)) {
                userStatsMap.set(username, {
                    username,
                    totalPoints: 0,
                    totalTime: 0,
                });
            }

            const userStats = userStatsMap.get(username);
            userStats.totalPoints += points || 0;
            userStats.totalTime += duration_ms || 0;
        });

        // Converter para array
        const userStatsArray = Array.from(userStatsMap.values());

        // Ordenar: 1º por pontos DESC, 2º por tempo ASC
        userStatsArray.sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) {
                return b.totalPoints - a.totalPoints; // Maior pontuação primeiro
            }
            return a.totalTime - b.totalTime; // Menor tempo primeiro em caso de empate
        });

        // Paginar
        const paginatedData = userStatsArray.slice(offset, offset + limit);

        return NextResponse.json(
            {
                data: paginatedData,
                pagination: {
                    currentPage: page,
                    totalItems: userStatsArray.length,
                    totalPages: Math.ceil(userStatsArray.length / limit),
                    itemsPerPage: limit,
                },
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Unexpected API error:", err);
        return NextResponse.json(
            { error: "Unexpected error while fetching ranking data." },
            { status: 500 }
        );
    }
}
