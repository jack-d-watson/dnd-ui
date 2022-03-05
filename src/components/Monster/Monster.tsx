import React, { useEffect, useState } from "react";
import { Monster } from "../../types/Monster";
import { getMonsterByIndex } from "../../utils/monsterUtils";
import './Monster.css'
import { MonsterActions } from "./MonsterActions";
import { MonsterStats } from "./MonsterStats";

export interface MonsterProps {
    index: string | undefined
}

export function MonsterDisplay(props: MonsterProps) {
    const { index } = props
    const [monster, setMonster] = useState<Monster | null>();

    useEffect(() => {
        if(index) {
            getMonsterByIndex(index).then((response) => {
                setMonster(response)
            }).catch((error) => {
                console.error(`Error getting Monster ${index}.`, error)
            })
        }
    }, [index])

    if(monster) {
        return (
            <div className="monster" id={"monster-" + monster.index}>
                <div className="section-seperator">
                    <h1 className="section-title name">{monster.name}</h1>
                    <p className="descriptors italic">{monster.size} {monster.type}{monster.subtype ? ` (${monster.subtype})` : "" }, {monster.alignment} </p>
                </div>
                <MonsterStats monster={monster} />
                <br/>
                {
                    monster.special_abilities ? 
                    <div className="" id="special-abilities">
                        <MonsterActions actionList={monster.special_abilities} />
                    </div>
                    : <></>
                }
                {
                    monster.actions ? 
                    <div className="" id="actions">
                        <h2 className="section-title section-seperator">Actions</h2>
                        <MonsterActions actionList={monster.actions} />
                    </div>
                    : <></>
                }
                {
                    monster.legendary_actions ? 
                    <div className="" id="legendary-actions">
                        <h2 className="section-title section-seperator">Legendary Actions</h2>
                        <MonsterActions actionList={monster.legendary_actions} />
                    </div>
                    : <></>
                }
            </div>
        )
    }
    
    return (
        <h2>Loading...</h2>
    )
}