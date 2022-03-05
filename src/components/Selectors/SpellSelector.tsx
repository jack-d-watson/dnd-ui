import React, { useState } from "react";
import { SpellDisplay } from "../Spell/Spell";
import { ResourceSelector } from "./ResourceSelector/ResourceSelector";

export function SpellSelector() {
    const [spellIndex, setSpellIndex] = useState("")

    const onSelectSpell = (event: any) => {
        setSpellIndex(event.target.value)
    }

    return (
        <ResourceSelector resourceListUri={"spells"} onResourceSelected={onSelectSpell} label={"Select a Spell: "} id={"spells"} >
            <SpellDisplay index={spellIndex} />
        </ResourceSelector>
    )
}