import React from "react"
import './style.css';

const Friend = ({updateHeaderTitle, updateViewType, updateMiniTitle, blocked}) => {
    const clickHandleFollowing = () => {
        if (!blocked)
        {
            updateHeaderTitle('Friends')
            updateMiniTitle('Following')
            updateViewType('songs')
        }
    }

    const clickHandleYouMayKnow = () => {
        if (!blocked)
        {
            updateHeaderTitle('Friends')
            updateMiniTitle('You May Know')
            updateViewType('songs')
        }
    }

    const clickHandleFollowYou = () => {
        if (!blocked)
        {
            updateHeaderTitle('Friends')
            updateMiniTitle('Follow You')
            updateViewType('songs')
        }
    }

    return (
        <div className="friend-container">
            <h3 className="friend-header">Friends</h3>
            <ul className="side-menu-container">
                <li className="side-menu-item" onClick={clickHandleFollowing}>Following</li>
                <li className="side-menu-item" onClick={clickHandleFollowYou}>Follow You</li>
                <li className="side-menu-item" onClick={clickHandleYouMayKnow}>You May Know</li>
            </ul>
        </div>
    )
}

export default Friend