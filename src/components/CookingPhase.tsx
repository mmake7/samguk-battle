"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chef, narrations } from "../data/gameData";

interface CookingPhaseProps {
  chef: Chef;
  chefIndex: number;
  totalChefs: number;
  onComplete: () => void;
}

export default function CookingPhase({
  chef,
  chefIndex,
  totalChefs,
  onComplete,
}: CookingPhaseProps) {
  const [stepIndex, setStepIndex] = useState(-1); // -1 = 내레이션
  const step = stepIndex >= 0 ? chef.steps[stepIndex] : null;
  const isLastStep = stepIndex === chef.steps.length - 1;
  const progress =
    stepIndex < 0 ? 0 : ((stepIndex + 1) / chef.steps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center min-h-screen px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 상단: 요리사 정보 + 진행 상태 */}
      <div className="w-full max-w-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{chef.emoji}</span>
            <span className="font-bold" style={{ color: chef.color }}>
              {chef.kingdom} · {chef.name}
            </span>
          </div>
          <span className="text-sm text-[var(--color-gold)] opacity-70">
            {chefIndex + 1} / {totalChefs} 요리사
          </span>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-full h-2 rounded-full bg-[var(--color-hanji-border)]">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: chef.color }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* 스텝 인디케이터 */}
        <div className="flex justify-between mt-2">
          {chef.steps.map((s, i) => (
            <div
              key={i}
              className="text-xs text-center transition-opacity duration-200"
              style={{
                opacity: i <= stepIndex ? 1 : 0.3,
                color: i === stepIndex ? chef.color : "#e8dcc8",
              }}
            >
              {s.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <AnimatePresence mode="wait">
        {stepIndex < 0 ? (
          /* 내레이션 */
          <motion.div
            key="narration"
            className="glass-card max-w-lg w-full p-8 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
          >
            <p className="text-lg leading-relaxed whitespace-pre-line text-[var(--color-gold-light)]">
              {narrations.beforeCooking(chef.name, chef.kingdom)}
            </p>
            <p className="mt-4 text-2xl font-bold" style={{ color: chef.color }}>
              {chef.dishName}
            </p>

            {/* 재료 미리보기 */}
            <div className="mt-6 text-left">
              <p className="text-sm text-[var(--color-gold)] mb-3 text-center">
                📋 준비 재료
              </p>
              {chef.ingredients.map((ig) => (
                <div key={ig.category} className="mb-3">
                  <p
                    className="text-xs font-bold mb-1"
                    style={{ color: chef.colorLight }}
                  >
                    {ig.category}
                  </p>
                  <p className="text-xs text-[#e8dcc8] opacity-70">
                    {ig.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : step ? (
          /* 조리 스텝 */
          <motion.div
            key={`step-${stepIndex}`}
            className="glass-card max-w-lg w-full p-8"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-center mb-4">
              <span className="text-4xl">{step.emoji}</span>
            </div>
            <h3
              className="text-xl font-bold text-center mb-2"
              style={{ color: chef.color }}
            >
              {step.title}
            </h3>
            {step.duration && (
              <p className="text-center text-sm text-[var(--color-gold)] opacity-70 mb-4">
                ⏱ {step.duration}
              </p>
            )}
            <p className="text-base leading-relaxed text-[#e8dcc8]">
              {step.description}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* 다음 버튼 */}
      <motion.button
        onClick={handleNext}
        className="mt-8 px-8 py-3 rounded-xl text-lg font-bold text-[var(--color-hanji)] cursor-pointer"
        style={{
          background: `linear-gradient(to right, ${chef.color}, ${chef.colorLight})`,
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {stepIndex < 0
          ? "조리 시작!"
          : isLastStep
            ? chefIndex < totalChefs - 1
              ? "다음 요리사로 →"
              : "심사하러 가기 →"
            : "다음 단계 →"}
      </motion.button>
    </motion.div>
  );
}
