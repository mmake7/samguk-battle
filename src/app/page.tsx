"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { chefs } from "../data/gameData";
import IntroScreen from "../components/IntroScreen";
import CharacterSelect from "../components/CharacterSelect";
import CookingPhase from "../components/CookingPhase";
import JudgingPhase from "../components/JudgingPhase";
import ResultScreen from "../components/ResultScreen";
import RecipeDetail from "../components/RecipeDetail";
import ProgressBar from "../components/ProgressBar";

type Phase = "intro" | "characters" | "cooking" | "judging" | "result" | "recipe";

interface Scores {
  [chefId: string]: { taste: number; history: number; visual: number };
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [cookingChefIndex, setCookingChefIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({});
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>("");

  const handleCookingComplete = () => {
    const nextIndex = cookingChefIndex + 1;
    if (nextIndex < chefs.length) {
      setCookingChefIndex(nextIndex);
    } else {
      setPhase("judging");
    }
  };

  const handleJudgingComplete = (finalScores: Scores) => {
    setScores(finalScores);
    setPhase("result");
  };

  const handleViewRecipe = (chefId: string) => {
    setSelectedRecipeId(chefId);
    setPhase("recipe");
  };

  const selectedChef = chefs.find((c) => c.id === selectedRecipeId);

  return (
    <main className="relative">
      <ProgressBar currentPhase={phase} />

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <IntroScreen
            key="intro"
            onStart={() => setPhase("characters")}
          />
        )}

        {phase === "characters" && (
          <CharacterSelect
            key="characters"
            onComplete={() => {
              setCookingChefIndex(0);
              setPhase("cooking");
            }}
          />
        )}

        {phase === "cooking" && (
          <CookingPhase
            key={`cooking-${cookingChefIndex}`}
            chef={chefs[cookingChefIndex]}
            chefIndex={cookingChefIndex}
            totalChefs={chefs.length}
            onComplete={handleCookingComplete}
          />
        )}

        {phase === "judging" && (
          <JudgingPhase
            key="judging"
            onComplete={handleJudgingComplete}
          />
        )}

        {phase === "result" && (
          <ResultScreen
            key="result"
            scores={scores}
            onViewRecipe={handleViewRecipe}
          />
        )}

        {phase === "recipe" && selectedChef && (
          <RecipeDetail
            key="recipe"
            chef={selectedChef}
            onBack={() => setPhase("result")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
