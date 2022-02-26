import axios from "axios";
import React, { useEffect, useState } from "react";
import { Monster } from "../../types/Monster";

export function MonsterDisplay(props: any) {
    const { monsterIndex } = props
    const [monster, setMonster] = useState<Monster | null>();

    useEffect(() => {
        async function getMonsterByName() {
            const response = await axios.get(`https://www.dnd5eapi.co/api/monsters/${monsterIndex}`)
            setMonster(response.data)
        }

        getMonsterByName()        
    }, [monsterIndex])

    if(monster) {
        return (
            <>
                <h2>{monster.name}</h2>
            </>
        )
    }
    
    return (
        <h2>Loading...</h2>
    )
}