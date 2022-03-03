import React from "react";
import { Monster } from "../../types/Monster";
import { Proficiency, ProficiencyType } from "../../types/Proficiency";
import { formatChallengeRating, formatSensesAsString, getFormattedConditionTypes, getFormattedDamageTypes } from "../../utils/monsterUtils";
import { getProficiencyName, getProficiencyType, getProficiencyValue } from "../../utils/proficiencyUtils";
import { Field } from "../common/Field";
import { AbilityScore } from "./AbilityScore";

function displayMonsterAbilityScores(monster: Monster) : JSX.Element {
    return (
        <div className="abilityScoreList section-seperator">
            <AbilityScore scoreType="strength" value={monster.strength}/>
            <AbilityScore scoreType="dexterity" value={monster.dexterity}/>
            <AbilityScore scoreType="constitution" value={monster.constitution}/>
            <AbilityScore scoreType="intelligence" value={monster.intelligence}/>
            <AbilityScore scoreType="wisdom" value={monster.wisdom}/>
            <AbilityScore scoreType="charisma" value={monster.charisma}/>
        </div>
    )
}

function displayMonsterProficiencies(proficiencies: Proficiency[]) : JSX.Element {
    let savingThrows = ""
    let skills = ""
    // Monsters have proficiencies that are either Saving Throws or Skills
    // Iterate through the list
    for(let proficiency of proficiencies) {
        const value = getProficiencyValue(proficiency)
        // Seperate based on proficiency type
        if(getProficiencyType(proficiency) === ProficiencyType.SAVING_THROW) {
            // Add a comma if something has been added to the string already
            if(savingThrows != "") {
                savingThrows += ", "
            }
            savingThrows += `${getProficiencyName(proficiency)} ${value}`
        }
        else {
            if(skills != "") {
                skills += ", "
            }
            skills += `${getProficiencyName(proficiency)} ${value}`
        }
    }

    // Return Saving Throw and Skill html, in order, if either was populated
    return (
        <div className="proficiencies">
            { savingThrows.length > 0 ? <Field label="Saving Throws" value={savingThrows} isBold={true} isItalic={false} /> : <></> }
            { skills.length > 0 ? <Field label="Skills" value={skills} isBold={true} isItalic={false} /> : <></> }
        </div>
    );
}

export interface MonsterStatProps {
    monster: Monster
}

export function MonsterStats (props: MonsterStatProps) {
    const { monster } = props
    return (
        <div className="monsterStats section-seperator" id={"monster-" + monster.index}>
            <div className="section-seperator">
                <Field label="Armor Class" value={`${monster.armor_class}`} isBold={true} isItalic={false} />          
                <Field label="Hit Points" value={`${monster.hit_points}`} isBold={true} isItalic={false} />
                <Field label="Speed" value={`${monster.speed}`} isBold={true} isItalic={false} />
            </div>
            
            {displayMonsterAbilityScores(monster)}
            {displayMonsterProficiencies(monster.proficiencies)}
            {monster.damage_vulnerabilities.length > 0 ? <Field label="Damage Vulnerabilities" value={getFormattedDamageTypes(monster.damage_vulnerabilities)} isBold={true} isItalic={false} /> : <></>}
            {monster.damage_resistances.length > 0 ? <Field label="Damage Resistances" value={getFormattedDamageTypes(monster.damage_resistances)} isBold={true} isItalic={false} /> : <></>}
            {monster.damage_immunities.length > 0 ? <Field label="Damage Immunities" value={getFormattedDamageTypes(monster.damage_immunities)} isBold={true} isItalic={false} /> : <></>}
            {monster.condition_immunities.length > 0 ? <Field label="Condition Immunities" value={getFormattedConditionTypes(monster.condition_immunities)} isBold={true} isItalic={false} /> : <></>}
            <Field label="Senses" value={formatSensesAsString(monster.senses)} isBold={true} isItalic={false} />
            <Field label="Languages" value={monster.languages} isBold={true} isItalic={false} />
            <Field label="Challenge" value={`${formatChallengeRating(monster.challenge_rating)} (${new Intl.NumberFormat().format(monster.xp)} XP)`} isBold={true} isItalic={false} />        
        </div>
    )
}