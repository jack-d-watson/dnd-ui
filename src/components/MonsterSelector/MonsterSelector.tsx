import React, { useEffect, useState } from "react";
import { MonsterDisplay } from "../Monster/Monster";
import { ApiReference } from "../../types/APIReference"
import { getMonsterList } from "../../utils/monsterUtils";
import "./MonsterSelector.css"

export function MonsterSelector () {
    const [monsterIndex, setMonsterIndex] = useState("")
    const [monsterList, setMonsterList] = useState(new Array<ApiReference>())

    const onSelectMonster = (event: any) => {
        setMonsterIndex(event.target.value)
    }

    useEffect(() => {
        getMonsterList().then((list: ApiReference[]) => {
            setMonsterList(list)
            setMonsterIndex(list[0].index)
        }).catch((error) => {
            console.error(`Error getting MonsterList.`, error)
        })
    }, [])
    
    if(monsterList.length > 0) {
        return (
            <div className="monsterSelector">
                <label htmlFor="monsterSelector">Select a Monster: </label>
                <select name="monsterSelector" onChange={onSelectMonster}>
                    {
                        monsterList.map((monsterApi: ApiReference) => {
                            return (<option value={monsterApi.index}>{monsterApi.name}</option>)
                        })
                    }
                </select>
                {
                    monsterIndex ? 
                    <MonsterDisplay monsterIndex={monsterIndex} /> :
                    <></>
                }
            </div>   
        )
    }
    
    return (
        <div className="monsterSelector">
            <h1>Loading...</h1>
        </div>
    )
} 