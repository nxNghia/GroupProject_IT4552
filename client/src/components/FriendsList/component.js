import { useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    heartIcon: {
        color: '#eee'
    },

    heartIcon_active: {
        color: '#056100'
    }
}))

const FriendList = ({friendsList = [], id, fetchFriendsList, fetchFriendInfo, updateHeaderTitle, updateViewType}) => {
    const classes = useStyles()
    const [follow, setFollow] = useState([])

    useEffect(() => {
        console.log(friendsList)
    }, [friendsList])

    const followHandle = (id) => {
        if (!follow.includes(id))
            setFollow([...follow, id])
    }

    const clickHandle = (name) => {
        fetchFriendInfo(id)
        updateHeaderTitle(name)
        updateViewType('user')
    }

    return (
        <>
        <h4>Following</h4>
            <div className='friends-view'>
            {friendsList.map((friend, index) => {
                return (
                    <div key={index} className='friend-details-container friend-list' onClick={() => clickHandle(friend.name)}>
                        <div className='friend-info'>
                            <img className='friend-image' alt='user' src='https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1541753135972237&height=300&width=300&ext=1644084837&hash=AeSC8yDJHOhyCg24QRM' />
                            {friend.name}
                        </div>
                        <IconButton onClick={() => followHandle(friend.id)}>
                            <FavoriteIcon className={follow.includes(friend.id) ? classes.heartIcon_active : classes.heartIcon}/>
                        </IconButton>
                    </div>
                )
            })}
            </div>
        <h4>You may know</h4>
        </>
    )
}

export default FriendList;