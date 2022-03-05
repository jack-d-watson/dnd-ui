import React, { useEffect, useState } from "react";
import { ApiReference } from "../../../types/APIReference";
import { getResourceList } from "../../../utils/apiReferenceUtils";
import './ResourceSelector.css'

export interface ResourceSelectorProps {
    resourceListUri: string,
    onResourceSelected: (event: any) => void,
    label: string,
    id: string,
    children?: React.ReactNode
}

export function ResourceSelector(props: ResourceSelectorProps) {
    const { resourceListUri, onResourceSelected, label, id, children } = props
    const [resourceList, setResourceList] = useState(new Array<ApiReference>())

    useEffect(() => {
        getResourceList(resourceListUri).then((list: ApiReference[]) => {
            setResourceList(list)
            onResourceSelected({ target: { value: list[0].index}})
        }).catch((error: any) => {
            console.error(`Error getting Resources from ${resourceListUri}.`, error)
        })
    }, [resourceListUri])
    
    if(resourceList.length > 0) {
        return (
            <div className="resourceSelector">
                <label htmlFor={`${id}Selector`}>{label}</label>
                <select name={`${id}Selector`} onChange={onResourceSelected}>
                    {
                        resourceList.map((resource: ApiReference) => {
                            return (<option value={resource.index}>{resource.name}</option>)
                        })
                    }
                </select>
               {
                   children
               }
            </div>   
        )
    }

    return (
        <div className="resourceSelector">
            <h1>Loading...</h1>
        </div>
    )
}