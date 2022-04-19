
export function getSpellLevelAndSchool(level: number, school: string) : string {
    switch(level) {
        case 0: return `${school} cantrip`
        case 1: return `1st-level ${school}`
        case 2: return `2nd-level ${school}`
        case 3: return `3rd-level ${school}`
        default: return `${level}th-level ${school}`
    }
}