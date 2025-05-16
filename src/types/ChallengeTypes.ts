import { LGU_PATH_TYPE } from '../types/ProvinceTypes';

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
    provinceGameStates: { name: string; lives: number; isCompleted: boolean,isGuessed: boolean }[];
    setProvinceGameStates: React.Dispatch<React.SetStateAction<{ name: string; lives: number; isCompleted: boolean, isGuessed: boolean }[]>>;
    pickRandomProvinces: () => void;
    startGame:()=>void;
    updateProvinceLives: (provinceName: string, action?: "decrease" | "increase", value?: number) => void;
    updateProvinceCompletion: (provinceName: string, isCompleted: boolean) => void; 
    updateProvinceGuessed:(provinceName: string, isGuessed: boolean) =>void;
    provinceLocations:ProvinceLocation[];
    isLoading:boolean,
    isGameOver:boolean        
};

export interface SummaryRecord {
    correctGuessesRecord: string[];
    wrongGuessesRecord: string[];
    currentGuessRecord: string;
}

export interface GameOverScreenType {
    provinceGuessRecords: { [provinceName: string]: SummaryRecord };
    pathsData: LGU_PATH_TYPE;
    currentProvince: { name: string; lives: number; isCompleted: boolean ,isGuessed:boolean}
    correctGuesses: [string, string][]
    provinceGameStates: { name: string; lives: number; isCompleted: boolean,isGuessed:boolean }[];
    handleTryAgain: () => void
    isEmptyLives?: boolean
    time: number;
    timeOut?:boolean
    surrender?:boolean
}
