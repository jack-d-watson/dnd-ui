import React from "react";

export interface SpellDisplayProps {
    index: string | undefined
}
export function SpellDisplay(props: SpellDisplayProps) {
    const { index } = props

    if(index) {
        return (<h1>{index}</h1>)
    }

    return <h1>butt</h1>
}