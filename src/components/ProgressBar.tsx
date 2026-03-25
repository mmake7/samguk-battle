"use client";

import { motion } from "framer-motion";

type Phase = "intro" | "characters" | "cooking" | "judging" | "result" | "recipe";

const phases: { key: Phase; label: string }[] = [
  { key: "intro", label: "서막" },
  { key: "characters", label: "등장" },
  { key: "cooking", label: "조리" },
  { key: "judging", label: "심사" },
  { key: "result", label: "결과" },
];

interface ProgressBarProps {
  currentPhase: Phase;
}

export default function ProgressBar({ currentPhase }: ProgressBarProps) {
  if (currentPhase === "intro" || currentPhase === "recipe") return null;

  const currentIndex = phases.findIndex((p) => p.key === currentPhase);
  if (currentIndex < 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-2 backdrop-blur-sm border-b border-[var(--color-hanji-border)]" style={{ backgroundColor: "rgba(26,22,18,0.9)" }}>
      <div className="max-w-lg mx-auto flex items-center gap-1">
        {phases.map((phase, i) => {
          const isActive = i === currentIndex;
          const isDone = i < currentIndex;

          return (
            <div key={phase.key} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-center">
                <div
                  className="w-full h-1 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor:
                      isDone || isActive
                        ? "var(--color-gold)"
                        : "var(--color-hanji-border)",
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="h-full rounded-full bg-[var(--color-gold-light)]"
                      initial={{ width: "30%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </div>
              <span
                className="text-[10px] mt-1 transition-colors duration-300"
                style={{
                  color: isActive
                    ? "var(--color-gold)"
                    : isDone
                      ? "var(--color-gold)"
                      : "rgba(232,220,200,0.3)",
                  fontWeight: isActive ? 700 : 400,
                }}
              >
                {phase.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
