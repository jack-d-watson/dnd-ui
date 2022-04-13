import { Proficiency, ProficiencyType } from "../types/Proficiency";

const SAVING_THROW = "saving-throw"

export function getProficiencyType(proficiency: Proficiency) : ProficiencyType {
    const proficiencyName = proficiency.proficiency.index
    if(proficiencyName.startsWith(SAVING_THROW)) {
        return ProficiencyType.SAVING_THROW
    }

    return ProficiencyType.SKILL
}

// Converts "Skill: Stealth" or "Saving Throw: DEX" to "Stealth" or "DEX"
export function getProficiencyName(proficiency: Proficiency) : string {
    return proficiency.proficiency.name.substring(proficiency.proficiency.name.indexOf(':') + 1)
}


// Returns the value formatted as a string. Format is +X or -X.
export function getProficiencyValue(proficiency: Proficiency) : string {
    // If the number is 0 or higher, it should be displayed as +X
    if(proficiency.value >= 0) {
        return `+${proficiency.value}`
    }

    // Otherwise default string conversion will display it as -X
    return "" + proficiency.value
}