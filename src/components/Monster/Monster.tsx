import React, { useEffect, useState } from "react";
import { Monster } from "../../types/Monster";
import { Proficiency, ProficiencyType } from "../../types/Proficiency";
import { formatChallengeRating, formatSensesAsString, getAbilityAbbreviation, getAbilityLabel, getFormattedDamageConditionTypes, getMonsterByIndex } from "../../utils/monsterUtils";
import { getProficiencyType, getProficiencyName, getProficiencyValue } from "../../utils/proficiencyUtils";
import { Field } from "../common/Field";
import { AbilityScore } from "./AbilityScore";
import './Monster.css'
import { MonsterStats } from "./MonsterStats";

export interface MonsterProps {
    monsterIndex: string
}

export function MonsterDisplay(props: MonsterProps) {
    const { monsterIndex } = props
    const [monster, setMonster] = useState<Monster | null>();

    useEffect(() => {
        getMonsterByIndex(monsterIndex).then((response) => {
            setMonster(response)
        }).catch((error) => {
            console.error(`Error getting Monster ${monsterIndex}.`, error)
        })
    }, [monsterIndex])

    if(monster) {
        return (
            <div className="monster" id={"monster-" + monster.index}>
                <div className="title section-seperator">
                    <h2 className="name">{monster.name}</h2>
                    <p className="descriptors italic">{monster.size} {monster.type}{monster.subtype ? ` (${monster.subtype})` : "" }, {monster.alignment} </p>
                </div>
                <MonsterStats monster={monster} />
                <br/>
                <div className="special-abilities">
                    {monster.special_abilities ? 
                            monster.special_abilities.map( (ability) => {
                                console.log(`${monster.name} ability: ${ability.name}`)
                                return (<Field label={getAbilityLabel(ability)} value={ability.desc} isBold={true} isItalic={true} />)
                            })
                        : <></>
                    }
                </div>
                
            </div>
        )
    }
    
    return (
        <h2>Loading...</h2>
    )
}