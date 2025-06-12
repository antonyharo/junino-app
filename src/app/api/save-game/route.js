import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";

export async function POST(req) {
    try {
        const { username, contact, durationMs, game, points } =
            await req.json();

        if (!username || !game || !durationMs || !points) {
            return NextResponse.json(
                {
                    error: "Todos os parâmetros são obrigatórios",
                },
                { status: 400 }
            );
        }

        const supabase = supabaseClient();

        const { data, error } = await supabase
            .from("game_history")
            .insert([
                {
                    username,
                    contact,
                    game,
                    duration_ms: durationMs,
                    points,
                },
            ])
            .select()
            .single();

        if (error) {
            console.log(error);
            return NextResponse.json(
                { error: `Erro ao criar tarefa: ${error.message}` },
                { status: 400 }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Erro ao processar requisição" },
            { status: 500 }
        );
    }
}
