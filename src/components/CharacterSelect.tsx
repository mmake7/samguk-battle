"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chefs } from "../data/gameData";

interface CharacterSelectProps {
  onComplete: () => void;
}

export default function CharacterSelect({ onComplete }: CharacterSelectProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const chef = chefs[currentIndex];
  const isLast = currentIndex === chefs.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 상단: 몇 번째 요리사 */}
      <div className="flex gap-3 mb-6">
        {chefs.map((c, i) => (
          <div
            key={c.id}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === currentIndex ? c.color : "rgba(212,168,67,0.3)",
              transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={chef.id}
          className="glass-card max-w-md w-full overflow-hidden"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* 카드 헤더 */}
          <div
            className="p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${chef.color}, ${chef.colorLight})`,
            }}
          >
            <div className="text-5xl mb-2">{chef.emoji}</div>
            <div className="text-sm opacity-80 mb-1">
              {chef.kingdom} · {chef.city}
            </div>
            <h2 className="text-3xl font-black text-white">{chef.name}</h2>
            <p className="text-sm text-white/80 mt-1">{chef.title}</p>
          </div>

          {/* 카드 바디: 캐치프레이즈 + 요리명 */}
          <div className="p-6 text-center">
            <p className="text-lg italic text-[var(--color-gold-light)] mb-4 leading-relaxed">
              &ldquo;{chef.catchphrase}&rdquo;
            </p>
            <div className="inline-block px-4 py-2 rounded-lg bg-[var(--color-hanji)] border border-[var(--color-gold)]/30">
              <span className="text-sm text-[var(--color-gold)] opacity-70">
                출전 요리
              </span>
              <p className="text-lg font-bold text-[var(--color-gold)]">
                {chef.dishName}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 다음 버튼 */}
      <motion.button
        onClick={handleNext}
        className="mt-8 px-8 py-3 rounded-xl text-lg font-bold text-[var(--color-hanji)] bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold-light)] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLast ? "대결 시작!" : "다음 요리사 →"}
      </motion.button>
    </motion.div>
  );
}
