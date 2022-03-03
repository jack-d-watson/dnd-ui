import { Action } from "./Action"
import { ApiReference } from "./APIReference"
import { Proficiency } from "./Proficiency"

export interface MonsterSpeed {
    [key: string]: string
}

export interface MonsterSenses {
    [key: string]: string | number
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
    condition_immunities: ApiReference[],
    senses: MonsterSenses,
    languages: string,
    challenge_rating: number,
    xp: number,
    special_abilities?: Action[] | undefined,
    actions: Action[] | undefined,
    legendary_actions: Action[] | undefined,
    url: string,
}