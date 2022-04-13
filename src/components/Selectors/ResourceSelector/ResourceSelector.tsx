import React from "react";
import { ApiReference } from "../../../types/APIReference";
import { gql, useQuery } from "@apollo/client"
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

    const RESOURCE_LIST = gql`
        query {
            ${resourceListUri} {
                index
                name
                url
            }
        }
    `
    const resourceList = useQuery(RESOURCE_LIST, {
        onCompleted: (data) => {
            onResourceSelected({
                target: {
                    value: data[resourceListUri][0].index
                }
            })
        }
    })

    if (resourceList.loading) {
        return (
            <div className="resourceSelector">
                <h1>Loading...</h1>
            </div>
        )
    }

    if (resourceList.error) {
        console.error(`Error retrieving ResourceSelector list for ${resourceListUri}: ${resourceList.error.message}`)
        return (
            <div className="resourceSelector">
                <h1>Error: {resourceList.error.message}</h1>
            </div>
        )
    }

    return (
        <div className="resourceSelector">
            <label htmlFor={`${id}Selector`}>{label}</label>
            <select name={`${id}Selector`} onChange={onResourceSelected}>
                {
                    resourceList.data[resourceListUri].map((resource: ApiReference) => {
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