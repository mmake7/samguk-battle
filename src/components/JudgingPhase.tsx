"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chefs, narrations } from "../data/gameData";

interface Scores {
  [chefId: string]: { taste: number; history: number; visual: number };
}

interface JudgingPhaseProps {
  onComplete: (scores: Scores) => void;
}

const criteria = [
  { key: "taste" as const, label: "맛", emoji: "😋" },
  { key: "history" as const, label: "역사성", emoji: "📜" },
  { key: "visual" as const, label: "비주얼", emoji: "🎨" },
];

function StampRating({
  value,
  onChange,
  color,
}: {
  value: number;
  onChange: (v: number) => void;
  color: string;
}) {
  return (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          onClick={() => onChange(star === value ? 0 : star)}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center text-lg cursor-pointer transition-colors"
          style={{
            borderColor: star <= value ? color : "rgba(212,168,67,0.3)",
            backgroundColor: star <= value ? color : "transparent",
            color: star <= value ? "white" : "rgba(212,168,67,0.4)",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {star <= value ? "印" : star}
        </motion.button>
      ))}
    </div>
  );
}

function NarrationView({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      key="judging-narration"
      className="flex flex-col items-center justify-center flex-1 max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="text-6xl mb-6">⚖️</div>
      <div className="glass-card p-8 text-center">
        <p className="text-lg leading-relaxed whitespace-pre-line text-[var(--color-gold-light)]">
          {narrations.beforeJudging}
        </p>
      </div>
      <motion.button
        onClick={onStart}
        className="mt-8 px-8 py-3 rounded-xl text-lg font-bold text-[var(--color-hanji)] bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        심사 시작
      </motion.button>
    </motion.div>
  );
}

export default function JudgingPhase({ onComplete }: JudgingPhaseProps) {
  const [currentChefIndex, setCurrentChefIndex] = useState(-1);
  const [scores, setScores] = useState<Scores>(() => {
    const initial: Scores = {};
    chefs.forEach((c) => {
      initial[c.id] = { taste: 0, history: 0, visual: 0 };
    });
    return initial;
  });

  const chef = currentChefIndex >= 0 ? chefs[currentChefIndex] : null;
  const isLastChef = currentChefIndex === chefs.length - 1;

  const currentScores = chef ? scores[chef.id] : null;
  const totalScore = currentScores
    ? currentScores.taste + currentScores.history + currentScores.visual
    : 0;
  const allScored = currentScores
    ? currentScores.taste > 0 &&
      currentScores.history > 0 &&
      currentScores.visual > 0
    : false;

  const handleScore = (
    criterion: "taste" | "history" | "visual",
    value: number
  ) => {
    if (!chef) return;
    setScores((prev) => ({
      ...prev,
      [chef.id]: { ...prev[chef.id], [criterion]: value },
    }));
  };

  const handleNext = () => {
    if (isLastChef) {
      onComplete(scores);
    } else {
      setCurrentChefIndex((i) => i + 1);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {currentChefIndex < 0 && (
          <NarrationView
            key="narration"
            onStart={() => setCurrentChefIndex(0)}
          />
        )}

        {chef && currentScores && (
          <motion.div
            key={chef.id}
            className="w-full max-w-lg"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* 요리사 인디케이터 */}
            <div className="flex justify-center gap-3 mb-6">
              {chefs.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all"
                  style={{
                    backgroundColor:
                      i === currentChefIndex
                        ? c.color
                        : "rgba(42,34,24,0.5)",
                    color:
                      i === currentChefIndex
                        ? "white"
                        : "rgba(232,220,200,0.4)",
                    border: `1px solid ${i <= currentChefIndex ? c.color : "transparent"}`,
                  }}
                >
                  {c.emoji} {c.name}
                  {i < currentChefIndex && " ✓"}
                </div>
              ))}
            </div>

            {/* 심사 카드 */}
            <div className="glass-card overflow-hidden">
              <div
                className="p-4 text-center"
                style={{
                  background: `linear-gradient(135deg, ${chef.color}, ${chef.colorLight})`,
                }}
              >
                <p className="text-sm text-white/80">{chef.kingdom}</p>
                <h3 className="text-xl font-bold text-white">
                  {chef.dishName}
                </h3>
              </div>

              <div className="p-6 space-y-6">
                {criteria.map((c) => (
                  <div key={c.key}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-bold text-[#e8dcc8]">
                        {c.emoji} {c.label}
                      </span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: chef.color }}
                      >
                        {currentScores[c.key]}/5
                      </span>
                    </div>
                    <StampRating
                      value={currentScores[c.key]}
                      onChange={(v) => handleScore(c.key, v)}
                      color={chef.color}
                    />
                  </div>
                ))}

                <div className="pt-4 border-t border-[var(--color-hanji-border)] text-center">
                  <span className="text-sm text-[var(--color-gold)] opacity-70">
                    총점
                  </span>
                  <p
                    className="text-3xl font-black"
                    style={{ color: chef.color }}
                  >
                    {totalScore}
                    <span className="text-lg font-normal opacity-60">
                      /15
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <motion.button
                onClick={handleNext}
                disabled={!allScored}
                className="px-8 py-3 rounded-xl text-lg font-bold cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: allScored
                    ? `linear-gradient(to right, ${chef.color}, ${chef.colorLight})`
                    : "rgba(42,34,24,0.5)",
                  color: allScored ? "white" : "rgba(232,220,200,0.3)",
                }}
                whileHover={allScored ? { scale: 1.05 } : {}}
                whileTap={allScored ? { scale: 0.95 } : {}}
              >
                {!allScored
                  ? "세 항목 모두 평가해주세요"
                  : isLastChef
                    ? "결과 보기 →"
                    : "다음 요리 심사 →"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
