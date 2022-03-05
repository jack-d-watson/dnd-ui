import React from "react"
import { NavLink } from "react-router-dom"
import './Header.css'

export function Header() {
    return (
        <header className="">
            <h1>dnd-ui</h1>
            <nav className="horizontal">
                <ul className="navbar">
                    <li><NavLink to="/monsters">Monsters</NavLink></li>
                    <li><NavLink to="/spells">Spells</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}