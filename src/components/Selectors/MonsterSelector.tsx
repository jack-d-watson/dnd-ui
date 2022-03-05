import React, { useState } from "react";
import { MonsterDisplay } from "../Monster/Monster";
import { ResourceSelector } from "./ResourceSelector/ResourceSelector";

export function MonsterSelector () {
    const [monsterIndex, setMonsterIndex] = useState("")

    const onSelectMonster = (event: any) => {
        setMonsterIndex(event.target.value)
    }

    return (
        <ResourceSelector resourceListUri={"monsters"} onResourceSelected={onSelectMonster} label={"Select a Monster: "} id={"monsters"} >
            <MonsterDisplay index={monsterIndex} />
        </ResourceSelector>
    )
} 