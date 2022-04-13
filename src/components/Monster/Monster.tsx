import React from "react";
import { Monster } from "../../types/Monster";
import './Monster.css'
import { MonsterActions } from "./MonsterActions";
import { MonsterStats } from "./MonsterStats";
import { useQuery } from "@apollo/client"
import { getMonsterByIndex } from "../../queries/MonsterByIndex";

export interface MonsterProps {
    index: string | undefined
}

export function MonsterDisplay(props: MonsterProps) {
    const { index } = props
    const { loading, error, data } = useQuery(getMonsterByIndex(index!!))

    if(loading) {
        return (
            <div className="monster" id={"monster-" + index}>
                <h2>Loading...</h2>
            </div>
        )
    }

    if(error) {
        console.error(`Error retrieving Monster ${index}: ${error.message}`)
        return (
            <div className="monster" id={"monster-" + index}>
                <h1>Error: {error.message}</h1>
            </div>
        )
    }

    const monster : Monster = data.monster
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