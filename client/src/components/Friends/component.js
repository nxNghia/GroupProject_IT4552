import React from "react"
import './style.css';

const Friend = ({updateHeaderTitle, updateViewType}) => {
    const clickHandle = () => {
        updateHeaderTitle('Friends')
        updateViewType('songs')
    }

    return (
        <div className="friend-container">
            <h3 className="friend-header">Friends</h3>
            <ul className="side-menu-container">
                <li className="side-menu-item" onClick={clickHandle}>Following</li>
                <li className="side-menu-item" onClick={clickHandle}>You may know</li>
            </ul>
        </div>
    )
}

export default Friend