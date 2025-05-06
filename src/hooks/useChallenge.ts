import { useContext } from "react";
import { ChallengeContextType } from "../types/ChallengeTypes";
import { ChallengeContext } from "../context/ChallengeContext";

export const useChallenge = (): ChallengeContextType => {
    const context = useContext(ChallengeContext);
    if (!context) {
      throw new Error("useChallenge must be used within a ChallengeProvider");
    }
    return context;
  };