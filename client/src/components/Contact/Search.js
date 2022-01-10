import React from "react"
import './style.css'

export const Search = () => {
    return (
        <div>
            <form className="form">
                <input className="search-bar" type="text" placeholder="Find..."/>
            </form>
        </div>
    )
}