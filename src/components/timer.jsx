"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { formatTime } from "@/lib/utils";

const Timer = ({ limitMs, durationMs, setDurationMs }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const requestRef = useRef(null);
    const startTimeRef = useRef(null);
    const accumulatedTimeRef = useRef(0);

    const animate = useCallback(
        (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;

            const elapsedRaw =
                timestamp - startTimeRef.current + accumulatedTimeRef.current;

            const elapsed = Math.max(0, Math.floor(elapsedRaw)); // sempre inteiro e não negativo

            if (limitMs && elapsed >= limitMs) {
                setDurationMs(Math.floor(limitMs));
                setIsRunning(false);
                cancelAnimationFrame(requestRef.current);
                return;
            }

            setDurationMs(elapsed);
            requestRef.current = requestAnimationFrame(animate);
        },
        [limitMs, setDurationMs]
    );

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = null;
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isRunning, animate]);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            setIsPaused(false);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(true);
        accumulatedTimeRef.current = Math.floor(durationMs || 0);
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setDurationMs(0);
        accumulatedTimeRef.current = 0;
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
    };

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <h2 className="text-2xl font-medium text-center">
                {formatTime(Math.floor(durationMs || 0))}
            </h2>

            <div className="flex gap-2">
                <Button
                    onClick={handleStart}
                    disabled={isRunning || (!isPaused && durationMs > 0)}
                >
                    {durationMs > 0 ? "Continuar" : "Iniciar"}
                </Button>

                <Button onClick={handleStop} disabled={!isRunning}>
                    Parar
                </Button>

                <Button
                    onClick={handleReset}
                    disabled={durationMs === 0 && !isRunning}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    );
};

export default Timer;
