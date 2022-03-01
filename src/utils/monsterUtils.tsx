import axios from "axios"
import { Monster, MonsterSenses, MonsterSpecialAbility, MonsterSpeed } from "../types/Monster"

const API_URL = "https://www.dnd5eapi.co/api"

function convertSpeedToString(speed: MonsterSpeed): string {
    let friendlySpeed = ""
    for(const key in speed) {
        if(key === "walk") {
            friendlySpeed += speed[key]
        }
        else {
            friendlySpeed += `, ${key} ${speed[key]}`
        }
    }
    return friendlySpeed
}

export async function getMonsterByIndex(index: string) : Promise<Monster> {
    const response = await axios.get(`${API_URL}/monsters/${index}`)
    const monster : Monster = response.data
    console.log(`monster type=${typeof monster}`)
    // Ensure monster.speed is an object and not a string
    if(typeof monster.speed === "object") {
        // Convert monster.speed to a string thats friendly to printing
        monster.speed = convertSpeedToString(monster.speed)
    }

    return response.data
}

export function getAbilityAbbreviation(ability: string) {
    return ability.substring(0, 3).toUpperCase()
}

export function firstLetterToUpperCase(str: string) : string {
    return str[0].toUpperCase() + str.slice(1)
}

/**
 * 
 * @param list an array with at least one element
 */
export function getFormattedDamageConditionTypes(list: string[]) : string {
    let formattedString = ""
    for(let item of list) {
        if(formattedString.length > 0) {
            formattedString += ", "
        }
        formattedString += firstLetterToUpperCase(item)
    }
    return formattedString
}

export function formatSensesAsString(senses: MonsterSenses) : string {
    let formattedSenses = ""
    for(let sense in senses) {
        if(formattedSenses.length > 0) {
            formattedSenses += ", "
        }

        if(sense === "passive_perception") {
            formattedSenses += `Passive Perception ${senses[sense]}`
        }
        else {
            formattedSenses += `${firstLetterToUpperCase(sense)} ${senses[sense]}`
        }
    }
    return formattedSenses
}

export function formatChallengeRating(challengeRating: number) : string {
    switch(challengeRating) {
        case 0.125: return "1/8"
        case 0.25: return "1/4"
        case 0.5: return "1/2"
        default: return challengeRating.toString()
    }
}

export function getAbilityLabel(ability: MonsterSpecialAbility) : string {
    let label = ability.name
    if(ability.usage) {
        label += ` (${ability.usage.times} ${ability.usage.type})`
        label = label.replace(" per ", "/")
    }

    return `${label}.`
}