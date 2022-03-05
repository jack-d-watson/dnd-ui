import axios from "axios"
import { Action } from "../types/Action"
import { ApiReference } from "../types/APIReference"
import { Monster, MonsterSenses, MonsterSpeed } from "../types/Monster"
import { API_URL } from "./apiReferenceUtils"

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
export function getFormattedDamageTypes(list: string[]) : string {
    let formattedString = ""
    for(let item of list) {
        console.log(item)
        if(formattedString.length > 0) {
            formattedString += ", "
        }
        formattedString += firstLetterToUpperCase(item)
    }
    return formattedString
}

/**
 * 
 * @param list an array with at least one element
 */
 export function getFormattedConditionTypes(list: ApiReference[]) : string {
    let formattedString = ""
    for(let item of list) {
        if(formattedString.length > 0) {
            formattedString += ", "
        }
        formattedString += firstLetterToUpperCase(item.name)
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

function getDiceMaxValue(dice: string) : number {
    return parseInt(dice.substring(dice.indexOf("d") + 1))
}

export function getAbilityLabel(action: Action) : string {
    let label = action.name
    if(action.usage) {
        if(action.usage.times) {
            label += ` (${action.usage.times} ${action.usage.type})`
            label = label.replace(" per ", "/")
        }
        else if(action.usage.dice && action.usage.min_value) {
            const diceMaxValue = getDiceMaxValue(action.usage.dice)
            // If the provided dice can roll higher than the minValue required for a Recharge
            // then the add a range like (Recharge X-Y)
            if(diceMaxValue > action.usage.min_value) {
                label +=` (Recharge ${action.usage.min_value}-${diceMaxValue})`
            }
            // otherwise add (Recharge X)
            else {
                label +=` (Recharge ${action.usage.min_value})`
            }
        }
    }

    return `${label}.`
}