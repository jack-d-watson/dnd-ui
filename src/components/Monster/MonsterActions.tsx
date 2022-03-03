import React from "react";
import { Action } from "../../types/Action";
import { getAbilityLabel } from "../../utils/monsterUtils";
import { Field } from "../common/Field";

export interface MonsterActionProps {
    actionList: Action[]
}

export function MonsterActions(props: MonsterActionProps) {
    const { actionList } = props
    return (
        <>
            {
                actionList.map( (action: any) => {
                    return (<Field label={getAbilityLabel(action)} value={action.desc} isBold={true} isItalic={true} />)
                })
            }
        </>
    )
}
