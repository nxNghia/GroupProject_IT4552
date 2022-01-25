import React from "react"
import './style.css'

export const Search = ({searchHandle}) => {
    return (
        <div>
            <form className="form">
                <input className="search-bar" type="text" placeholder="Find..." onChange={e => searchHandle(e.target.value)} />
            </form>
        </div>
    )
}