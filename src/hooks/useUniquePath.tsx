import { useState, useEffect } from 'react';
import { LGU_PATH_TYPE } from '../types/ProvinceTypes';
import { LGU_PATHS } from "../util/constants"


interface AnswerKeyMap {
    [uuid: string]: string; // uuid -> cityName
}

export function useUniquePathId() {
    const [pathsWithIds, setPathsWithIds] = useState<LGU_PATH_TYPE | null>(null);
    const [answerKeys, setAnswerKeys] = useState<AnswerKeyMap>({});

    useEffect(() => {
        const updatedLGUPaths: LGU_PATH_TYPE = {};
        const tempAnswerKeys: AnswerKeyMap = {};

        for (const provinceKey in LGU_PATHS) {
            const province = LGU_PATHS[provinceKey];

            const updatedPaths = province.paths.map((path) => {
                const cityName = path.id || '';
                const uuid = crypto.randomUUID();

                // Save to answer key: uuid => city name
                tempAnswerKeys[uuid] = cityName;

                return {
                    ...path,
                    id: uuid, // Replace city name with UUID
                };
            });

            updatedLGUPaths[provinceKey] = {
                ...province,
                paths: updatedPaths,
            };
        }

        setPathsWithIds(updatedLGUPaths);
        setAnswerKeys(tempAnswerKeys);
    }, []);

    return { pathsWithIds, answerKeys };
}
