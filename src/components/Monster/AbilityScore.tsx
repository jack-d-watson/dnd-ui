import React from "react";
import { getAbilityAbbreviation } from "../../utils/monsterUtils";
import './AbilityScore.css'

export interface AbilityScoreProps {
    scoreType: "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma",
    value: number
}

function getAbilityScoreModifier(abilityScore: number) : string {
    const modifier = Math.floor((abilityScore - 10) / 2 )
    if(modifier >= 0) {
        return `+${modifier}`
    }
    return `${modifier}`
}

export function AbilityScore(props: AbilityScoreProps) {
    const { scoreType, value } = props
    const scoreAbbreviation = getAbilityAbbreviation(scoreType)

    return (
        <div className="abilityScore">
            <div className="bold">{scoreAbbreviation}</div>
            <div>{value} ({getAbilityScoreModifier(value)})</div>
        </div>
    )
}