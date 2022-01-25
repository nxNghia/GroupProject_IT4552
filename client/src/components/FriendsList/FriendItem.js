import {
    makeStyles,
    Menu,
    MenuItem,
    IconButton,
    Button,
    Modal
} from '@material-ui/core'
import { useState } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReportIcon from '@material-ui/icons/Report';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
    heartIcon: {
        color: '#eee'
    },

    heartIcon_active: {
        color: '#056100'
    },

    menu: {
        '& .MuiMenu-paper': {
            background: 'rgba(200, 200, 200, 0.8)'
        }
    }
}))

const FriendItem = ({
    user,
    addFollowing,
    createFollow,
    fetchFriendInfo,
    updateHeaderTitle,
    updateViewType,
    following,
    id,
    followed = false,
    reportBegin
}) => {
    const classes = useStyles()
    const [follow, setFollow] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [current_followed_status, setCurrentFollowStatus] = useState(followed)

    const followHandle = (friendId) => {
        setAnchorEl(null)
        if (!follow.includes(friendId.token))
            setFollow([...follow, friendId.token])
        else
            setFollow(follow => follow.filter(i => i !== friendId.token))

        setCurrentFollowStatus(!current_followed_status)
        addFollowing(friendId.token)
        createFollow(id, friendId.token)
    }
    
    const clickHandle = (user) => {
        fetchFriendInfo(user.token)
        updateHeaderTitle(user.name, '', user.images[0].url)
        updateViewType('user')
    }

    const reportHandle = (friendId) => {
        setAnchorEl(null)
        reportBegin(true, friendId)
    }
    
    const menuClickHandle = e => setAnchorEl(e.currentTarget)

    const menuCloseHandle = () => setAnchorEl(null)
    return (
        <div className='friend-details-container friend-list'>
            <div className='friend-info' onClick={() => clickHandle(user)}>
                {user && user.images && <img className='friend-image' alt='user' src={user.images[0].url} />}
                {user.name}
            </div>
            <IconButton onClick={menuClickHandle}>
                <MenuIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={menuCloseHandle}
                className={classes.menu}
            >
                <MenuItem>
                    <IconButton onClick={() => followHandle(user)}>
                        <FavoriteIcon className={following.includes(user.token) || current_followed_status ? classes.heartIcon_active : classes.heartIcon}/>
                    </IconButton>
                </MenuItem>
                <MenuItem>
                    <IconButton onClick={() => reportHandle(user.token)}>
                        <ReportIcon />
                    </IconButton>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default FriendItem