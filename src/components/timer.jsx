"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

import { formatTime } from "@/lib/utils";

const Timer = ({ limitMs, timeElapsed, setTimeElapsed }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const requestRef = useRef(null);
    const startTimeRef = useRef(null);
    const previousTimeRef = useRef(0);

    const animate = (timestamp) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const delta =
            timestamp - startTimeRef.current + previousTimeRef.current;

        if (limitMs) {
            if (delta >= limitMs) {
                setTimeElapsed(limitMs);
                setIsRunning(false);
                cancelAnimationFrame(requestRef.current);
                return;
            }
        }

        setTimeElapsed(delta);
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isRunning) {
            startTimeRef.current = null;
            requestRef.current = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(requestRef.current);
    }, [isRunning]);

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            setIsPaused(false);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsPaused(true);
        previousTimeRef.current = timeElapsed;
        cancelAnimationFrame(requestRef.current);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeElapsed(0);
        previousTimeRef.current = 0;
        cancelAnimationFrame(requestRef.current);
    };

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <h2 className="text-2xl font-medium text-center">
                {formatTime(timeElapsed)}
            </h2>

            <div className="flex gap-2">
                <Button
                    onClick={handleStart}
                    disabled={isRunning || (!isPaused && timeElapsed > 0)}
                >
                    {timeElapsed > 0 ? "Continuar" : "Iniciar"}
                </Button>

                <Button onClick={handleStop} disabled={!isRunning}>
                    Parar
                </Button>

                <Button
                    onClick={handleReset}
                    disabled={timeElapsed === 0 && !isRunning}
                >
                    Reiniciar
                </Button>
            </div>
        </div>
    );
};

export default Timer;
