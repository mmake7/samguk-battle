"use client";

import { motion } from "framer-motion";
import { chefs, narrations } from "../data/gameData";

interface Scores {
  [chefId: string]: { taste: number; history: number; visual: number };
}

interface ResultScreenProps {
  scores: Scores;
  onViewRecipe: (chefId: string) => void;
}

const medals = ["🥇", "🥈", "🥉"];

export default function ResultScreen({
  scores,
  onViewRecipe,
}: ResultScreenProps) {
  const ranked = chefs
    .map((chef) => {
      const s = scores[chef.id];
      const total = s.taste + s.history + s.visual;
      return { chef, scores: s, total };
    })
    .sort((a, b) => b.total - a.total);

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 내레이션 */}
      <motion.p
        className="text-center text-[var(--color-gold-light)] mb-6 whitespace-pre-line"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {narrations.beforeResult}
      </motion.p>

      {/* 타이틀 */}
      <motion.h2
        className="text-3xl md:text-4xl font-black text-[var(--color-gold)] mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", delay: 0.5 }}
      >
        🏆 최종 결과
      </motion.h2>

      {/* 랭킹 카드 */}
      <div className="w-full max-w-lg space-y-4">
        {ranked.map((entry, rank) => (
          <motion.div
            key={entry.chef.id}
            className="glass-card overflow-hidden"
            initial={{ x: rank % 2 === 0 ? -60 : 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 + rank * 0.2 }}
          >
            <div className="flex items-center p-4 gap-4">
              {/* 메달 + 순위 */}
              <div className="text-center min-w-[50px]">
                <div className="text-3xl">{medals[rank]}</div>
                <div className="text-xs text-[var(--color-gold)] opacity-60">
                  {rank + 1}위
                </div>
              </div>

              {/* 요리사 정보 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{entry.chef.emoji}</span>
                  <span
                    className="font-bold text-lg"
                    style={{ color: entry.chef.color }}
                  >
                    {entry.chef.name}
                  </span>
                  <span className="text-xs text-[#e8dcc8] opacity-50">
                    {entry.chef.kingdom}
                  </span>
                </div>
                <p className="text-sm text-[#e8dcc8] opacity-70 mb-2">
                  {entry.chef.dishName}
                </p>

                {/* 점수 바 */}
                <div className="flex gap-3 text-xs">
                  {[
                    { label: "맛", value: entry.scores.taste },
                    { label: "역사", value: entry.scores.history },
                    { label: "비주얼", value: entry.scores.visual },
                  ].map((s) => (
                    <div key={s.label} className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-[#e8dcc8] opacity-50">
                          {s.label}
                        </span>
                        <span style={{ color: entry.chef.color }}>
                          {s.value}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[var(--color-hanji-border)]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: entry.chef.color }}
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(s.value / 5) * 100}%`,
                          }}
                          transition={{
                            delay: 1 + rank * 0.2,
                            duration: 0.5,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 총점 */}
              <div className="text-center min-w-[50px]">
                <div
                  className="text-2xl font-black"
                  style={{ color: entry.chef.color }}
                >
                  {entry.total}
                </div>
                <div className="text-xs text-[#e8dcc8] opacity-40">/15</div>
              </div>
            </div>

            {/* 레시피 보기 버튼 */}
            <button
              onClick={() => onViewRecipe(entry.chef.id)}
              className="w-full py-2 text-sm font-bold cursor-pointer transition-colors"
              style={{
                backgroundColor: `${entry.chef.color}20`,
                color: entry.chef.colorLight,
                borderTop: `1px solid ${entry.chef.color}30`,
              }}
            >
              📖 레시피 보기
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
