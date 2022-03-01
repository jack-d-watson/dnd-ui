import React from "react";

export declare interface FieldProps {
    label: string,
    value: string,
    isBold: boolean,
    isItalic: boolean
}

export function Field(props: FieldProps) {
    const { label, value, isBold, isItalic } = props

    let labelClasses = "";
    if(isBold) {
        labelClasses += "bold "
    }
    if(isItalic) {
        labelClasses += "italic "
    }

    return (
        <div><span className={labelClasses}>{label}</span> <span>{value}</span></div>
    );
}