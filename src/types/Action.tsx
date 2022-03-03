import { ApiReference } from "./APIReference";
import { Damage } from "./Damage";

export type Action = {
    name: string,
    desc: string,
    usage?: {
        type: string,
        times?: number | string
        dice?: string,
        min_value?: number
    }
    options?: {
        choose: number,
        from: object[]
    }
    damage?: Damage[]
    dc?: {
        dc_type: ApiReference,
        dc_value: number,
        success_type: string
    }
}