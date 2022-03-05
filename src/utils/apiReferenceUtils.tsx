import axios from "axios"
import { ApiReference } from "../types/APIReference"

export const API_URL = "https://www.dnd5eapi.co/api"

export async function getResourceList(listUri: string) : Promise<Array<ApiReference>> {
    const response = await axios.get(`${API_URL}/${listUri}/`)
    const monsterList : Array<ApiReference> = response.data.results
    return monsterList
}