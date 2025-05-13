import { createContext, useEffect, useState } from "react";
import { ChallengeContextType } from "../types/ChallengeTypes";
import { useProvince } from "../hooks/useProvince";
import { MAX_CHALLENGE_LIVES } from "../util/constants";

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { generateRandomProvinces, provinceLocations } = useProvince();
    const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
    const [provinceGameStates, setProvinceGameStates] = useState<{ name: string; lives: number; isCompleted: boolean, isGuessed: boolean }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const pickRandomProvinces = async () => {
        setIsLoading(true);
        setSelectedProvinces([])
        setIsGameOver(false);
        let newProvinces = generateRandomProvinces();

        while (newProvinces.length > 3 && newProvinces.some(province => selectedProvinces.includes(province))) {
            newProvinces = generateRandomProvinces();
        }

        await setSelectedProvinces(newProvinces);
        setIsLoading(false);
    };

    const startGame = async () => {
        await setProvinceGameStates(
            selectedProvinces.map((name) => ({
                name,
                lives: MAX_CHALLENGE_LIVES,
                isCompleted: false,
                isGuessed: false
            }))
        );
    };

    const updateProvinceLives = (
        provinceName: string,
        action: "decrease" | "increase" = "decrease",
        value: number = 1
    ) => {
        setProvinceGameStates((prevStates) =>
            prevStates.map((province) =>
                province.name === provinceName
                    ? {
                        ...province,
                        lives: Math.max(0, province.lives + (action === "increase" ? value : -value))
                    }
                    : province
            )
        );
    };

    const updateProvinceCompletion = (provinceName: string, isCompleted: boolean) => {
        setProvinceGameStates((prevStates) =>
            prevStates.map((province) =>
                province.name === provinceName
                    ? { ...province, isCompleted }
                    : province
            )
        );
    };

    const updateProvinceGuessed = (provinceName: string, isGuessed: boolean) => {
        setProvinceGameStates((prevStates) =>
            prevStates.map((province) =>
                province.name === provinceName
                    ? { ...province, isGuessed }
                    : province
            )
        );
    };

    useEffect(() => {
        if (provinceGameStates.length === 0) return;

        const allCompleted = provinceGameStates.every(p => p.isCompleted);
        // const allFailed = provinceGameStates.every(p => p.lives === 0);

        if (allCompleted) {
            setIsGameOver(true);
        } else {
            setIsGameOver(false);
        }
    }, [provinceGameStates]);

    return (
        <ChallengeContext.Provider value={{
            selectedProvinces,
            provinceGameStates,
            setProvinceGameStates,
            updateProvinceGuessed,
            pickRandomProvinces,
            startGame,
            updateProvinceLives,
            updateProvinceCompletion,
            provinceLocations,
            isLoading,
            isGameOver,
        }}>
            {children}
        </ChallengeContext.Provider>
    );
};


export { ChallengeContext };
