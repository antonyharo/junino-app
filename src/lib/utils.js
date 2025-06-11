import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
