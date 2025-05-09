export type ProvinceState = {
    name: string;
    lives: number;
    isCompleted: boolean;
};
export type ProvinceLocation = {
    province: string;
    locations: string[];
};
export type ChallengeContextType = {
    selectedProvinces: string[];
    provinceGameStates: { name: string; lives: number; isCompleted: boolean }[];
    setProvinceGameStates: React.Dispatch<React.SetStateAction<{ name: string; lives: number; isCompleted: boolean }[]>>;
    pickRandomProvinces: () => void;
    startGame:()=>void;
    updateProvinceLives: (provinceName: string, action?: "decrease" | "increase", value?: number) => void;
    updateProvinceCompletion: (provinceName: string, isCompleted: boolean) => void;    
    provinceLocations:ProvinceLocation[];
    isLoading:boolean,
    isGameOver:boolean    
};

export interface SummaryRecord {
    correctGuessesRecord: string[];
    wrongGuessesRecord: string[];
    currentGuessRecord: string;
}