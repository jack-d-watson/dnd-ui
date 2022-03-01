import { ApiReference } from "./APIReference"

export enum ProficiencyType {
    SAVING_THROW,
    SKILL
}

export type Proficiency = {
    proficiency: ApiReference,
    value: number
}