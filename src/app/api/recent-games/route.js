import { NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase";
import { formatDateTime } from "@/lib/utils";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const search = searchParams.get("search") || "";

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const supabase = await supabaseClient();

        let query = supabase
            .from("game_history")
            .select("*", { count: "exact" })
            .order("created_at", { ascending: false });

        if (search) {
            query = query.or(
                `username.ilike.%${search}%,contact.ilike.%${search}%`
            );
        }

        const { data, error, count } = await query.range(from, to);

        if (error) {
            console.error("Erro Supabase:", error.message);
            return NextResponse.json(
                { error: "Erro ao buscar dados" },
                { status: 500 }
            );
        }

        const formattedData =
            data?.map((item) => ({
                ...item,
                created_at: formatDateTime(item.created_at),
            })) || [];

        return NextResponse.json(
            {
                data: formattedData,
                count,
                page,
                totalPages: Math.ceil((count || 0) / limit),
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Erro interno:", err);
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
