import { Proficiency } from "./Proficiency"

export interface MonsterSpeed {
    [key: string]: string
}

export interface MonsterSenses {
    [key: string]: string | number
}

export interface MonsterSpecialAbility {
    name: string,
    desc: string,
    usage?: {
        type: string,
        times: number
    }
}

export type Monster = {
    index: string,
    name: string,
    size: string,
    type: string,
    subtype: string | null,
    alignment: string,
    armor_class: number,
    hit_points: number,
    speed: MonsterSpeed | string,
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    proficiencies: Proficiency[],
    damage_vulnerabilities: string[],
    damage_resistances: string[],
    damage_immunities: string[],
    condition_immunities: string[],
    senses: MonsterSenses,
    languages: string,
    challenge_rating: number,
    xp: number,
    special_abilities?: MonsterSpecialAbility[] | undefined,
    actions: object[],
    legendary_actions: object[],
    url: string,
}