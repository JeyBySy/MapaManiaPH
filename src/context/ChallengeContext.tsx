import { createContext, useEffect, useState } from "react";
import { ChallengeContextType } from "../types/ChallengeTypes";
import { useProvince } from "../hooks/useProvince";

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { generateRandomProvinces, provinceLocations } = useProvince();
    const maximumLives = 5
    const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
    const [provinceGameStates, setProvinceGameStates] = useState<{ name: string; lives: number; isCompleted: boolean }[]>([]);

    const pickRandomProvinces = async () => {
        const newProvinces = generateRandomProvinces();

        // while (newProvinces.some(province => selectedProvinces.includes(province))) {
        //     newProvinces = generateRandomProvinces();
        // }

        await setSelectedProvinces(newProvinces);
        await setProvinceGameStates(
            newProvinces.map((name) => ({
                name,
                lives: maximumLives,
                isCompleted: false,
            }))
        );
    };

    const updateProvinceLives = (
        provinceName: string,
        action: "decrease" | "increase" = "decrease",  // Define action (decrease or increase)
        value: number = 1  // Specify the number of lives to increase or decrease
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

    useEffect(() => {
        pickRandomProvinces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChallengeContext.Provider value={{
            selectedProvinces,
            provinceGameStates,
            setProvinceGameStates,
            pickRandomProvinces,
            updateProvinceLives,
            updateProvinceCompletion,
            provinceLocations
        }}>
            {children}
        </ChallengeContext.Provider>
    );
};

export { ChallengeContext };
