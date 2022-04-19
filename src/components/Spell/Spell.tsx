import { useQuery } from "@apollo/client";
import React from "react";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import { getSpellByIndex } from "../../queries/SpellByIndex"
import { Spell } from "../../types/Spell";
import { getSpellLevelAndSchool } from "../../utils/spellUtils";
import { Field } from "../common/Field";
import "./Spell.css"

const ReactMarkdownPlugins = [remarkGfm]
export interface SpellDisplayProps {
    index: string | undefined
}
export function SpellDisplay(props: SpellDisplayProps) {
    const { index } = props
    const { loading, error, data } = useQuery(getSpellByIndex(index!!))

    if(loading) {
        return (
            <div className="spell" id={"spell-" + index}>
                <h2>Loading...</h2>
            </div>
        )
    }

    if(error) {
        console.error(`Error retrieving Spell ${index}: ${error.message}`)
        return (
            <div className="spell" id={"spell-" + index}>
                <h1>Error: {error.message}</h1>
            </div>
        )
    }

    const spell : Spell = data.spell
    console.log(spell)

    let components = spell.components.toString().replaceAll(",", ", ")
    if(spell.material) {
        components += ` (${spell.material})`
    }

    let duration = spell.duration
    if(spell.concentration) {
        duration = `Concentration, ${duration.toLowerCase()}`
    } 

    let descriptions = ""
    for(let index = 0; index < spell.desc.length; index++) {
        const line = spell.desc[index]
        if(line.startsWith("|")) {
            descriptions +=  line + "\n"
            if(spell.desc.length > index + 1 && !spell.desc[index+1].startsWith("|")) {
                descriptions += "\n"
            }
        }
        else {
            descriptions += line + "\n\n"
        }
    }


    return (
        <div className="reference-card" id={"spell-" + spell.index}>
            <h1 className="section-title name">{spell.name}</h1>
            <p className="descriptors italic">{getSpellLevelAndSchool(spell.level, spell.school.name)} {spell.ritual ? "(ritual)" : ""}</p>
            <Field label="Casting Time:" value={spell.casting_time} isBold={true} isItalic={false} />
            <Field label="Range:" value={spell.range} isBold={true} isItalic={false} />
            <Field label="Components:" value={components} isBold={true} isItalic={false} />
            <Field label="Duration:" value={duration} isBold={true} isItalic={false} />
            <div className="spell-description">
                <ReactMarkdown children={descriptions} remarkPlugins={ReactMarkdownPlugins}/>
                {spell.higher_level.length > 0 ? <ReactMarkdown children={"**At Higher Levels.** " + spell.higher_level.join("\n\n")} remarkPlugins={ReactMarkdownPlugins} /> : <React.Fragment/>}
            </div>
        </div>
    )

}