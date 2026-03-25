"use client";

import { motion } from "framer-motion";
import { Chef } from "../data/gameData";

interface RecipeDetailProps {
  chef: Chef;
  onBack: () => void;
}

export default function RecipeDetail({ chef, onBack }: RecipeDetailProps) {
  return (
    <motion.div
      className="min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-lg mx-auto">
        {/* 뒤로가기 */}
        <button
          onClick={onBack}
          className="mb-4 text-[var(--color-gold)] opacity-70 hover:opacity-100 cursor-pointer text-sm"
        >
          ← 결과로 돌아가기
        </button>

        {/* 헤더 */}
        <div
          className="rounded-xl p-6 text-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${chef.color}, ${chef.colorLight})`,
          }}
        >
          <div className="text-4xl mb-2">{chef.emoji}</div>
          <p className="text-sm text-white/80">{chef.kingdom} · {chef.city}</p>
          <h2 className="text-2xl font-black text-white">{chef.dishName}</h2>
        </div>

        {/* 역사 */}
        <div className="glass-card p-5 mb-4">
          <h3 className="text-sm font-bold text-[var(--color-gold)] mb-2">
            📜 역사
          </h3>
          <p className="text-sm leading-relaxed text-[#e8dcc8] opacity-80">
            {chef.recipeHistory}
          </p>
        </div>

        {/* 재료 */}
        <div className="glass-card p-5 mb-4">
          <h3 className="text-sm font-bold text-[var(--color-gold)] mb-3">
            📋 재료
          </h3>
          {chef.ingredients.map((ig) => (
            <div key={ig.category} className="mb-3">
              <p
                className="text-xs font-bold mb-1"
                style={{ color: chef.colorLight }}
              >
                {ig.category}
              </p>
              <ul className="text-sm text-[#e8dcc8] opacity-80 space-y-0.5">
                {ig.items.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 조리 순서 */}
        <div className="glass-card p-5 mb-4">
          <h3 className="text-sm font-bold text-[var(--color-gold)] mb-3">
            👨‍🍳 조리 순서
          </h3>
          <div className="space-y-3">
            {chef.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: chef.color,
                    color: "white",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#e8dcc8]">
                    {step.emoji} {step.title}
                    {step.duration && (
                      <span className="text-xs text-[var(--color-gold)] opacity-60 ml-2">
                        {step.duration}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#e8dcc8] opacity-70 mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 팁 */}
        <div className="glass-card p-5 mb-8">
          <h3 className="text-sm font-bold text-[var(--color-gold)] mb-3">
            💡 요리 팁
          </h3>
          <ul className="space-y-2">
            {chef.tips.map((tip, i) => (
              <li
                key={i}
                className="text-sm text-[#e8dcc8] opacity-80 leading-relaxed"
              >
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
