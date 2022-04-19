import { IndexRouteProps } from "react-router-dom";
import { ApiReference } from "./APIReference";

export interface AmountAtLevel {
    [key: string]: string
}

export interface SpellDamage {
    damage_at_slot_level: AmountAtLevel | undefined,
    damage_at_character_level: AmountAtLevel | undefined,
    damage_type: ApiReference,
}

export interface AreaOfEffect { 
    size: number,
    type: string
}

export interface DifficultyClass {
    dc_success: string,
    dc_type: ApiReference,
    desc: string | null
}

export type Spell = {
    areaOfEffect: AreaOfEffect | undefined,
    attackType: string | undefined,
    casting_time: string,
    classes: ApiReference[]
    components: string[],
    concentration: boolean,
    damage: SpellDamage | undefined,
    dc: DifficultyClass | undefined,
    desc: string[],
    duration: string,
    heal_at_slot_level: AmountAtLevel | undefined,
    higher_level: string[],
    index: string,
    level: number,
    material: string | null,
    name: string,
    range: string,
    ritual: boolean,
    school: {
        desc: string,
        name: string,
        index: string,
        url: string
    }
    subclasses: ApiReference[],
    url: string
}