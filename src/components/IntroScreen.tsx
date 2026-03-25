"use client";

import { motion } from "framer-motion";
import { narrations } from "../data/gameData";

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 타이틀 */}
      <motion.div
        className="text-center mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-black text-[var(--color-gold)] drop-shadow-lg mb-2">
          삼국 요리 대전
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-gold-light)] opacity-70">
          三國 料理 大戰
        </p>
      </motion.div>

      {/* 삼국 미니 카드 */}
      <motion.div
        className="flex gap-4 md:gap-6 mb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[
          { name: "고구려", emoji: "🔥", color: "var(--color-goguryeo)" },
          { name: "백제", emoji: "🐟", color: "var(--color-baekje)" },
          { name: "신라", emoji: "🏺", color: "var(--color-silla)" },
        ].map((k) => (
          <div
            key={k.name}
            className="glass-card px-4 py-3 text-center"
            style={{ borderColor: k.color }}
          >
            <div className="text-2xl mb-1">{k.emoji}</div>
            <div className="text-sm font-bold" style={{ color: k.color }}>
              {k.name}
            </div>
          </div>
        ))}
      </motion.div>

      {/* 내레이션 (개선 #2) */}
      <motion.div
        className="glass-card max-w-lg mx-auto p-6 mb-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line text-[#e8dcc8] opacity-90">
          {narrations.intro}
        </p>
      </motion.div>

      {/* 시작 버튼 */}
      <motion.button
        onClick={onStart}
        className="px-10 py-4 rounded-xl text-xl font-bold text-[var(--color-hanji)] bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] animate-pulse-glow cursor-pointer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        대전 시작
      </motion.button>
    </motion.div>
  );
}
