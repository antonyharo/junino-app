import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, toZonedTime } from "date-fns-tz";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor(ms % 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
    )}:${String(milliseconds).padStart(3, "0")}`;
};

export const formatDateTime = (dateString) => {
    const timeZone = "America/Sao_Paulo";
    const date = new Date(dateString);

    // Converte para o fuso horário especificado
    const zonedDate = toZonedTime(date, timeZone);

    // Formata no padrão brasileiro
    return format(zonedDate, "dd/MM/yyyy HH:mm", { timeZone });
};
