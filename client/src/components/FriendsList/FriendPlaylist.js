import { useEffect, useState } from "react"
import './style.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    heartIcon: {
        color: '#eee'
    },

    heartIcon_active: {
        color: '#056100'
    }
}))

export const FriendPlaylist = ({playlist, updateHeaderTitle, updateViewType, addPlaylistItem}) => {
    const classes = useStyles()
    const [following, setFollowing] = useState([])

    useEffect(() => {
        console.log(playlist)
    }, [playlist])

    const clickHandle = (p) => {
        addPlaylistItem(p)
        updateHeaderTitle(p.name, p._id)
        updateViewType('playlist')
    }

    const loveHandle = (p) => {
        if (!following.includes(p))
        setFollowing([...following, p])
    }

    return (
        <>
            <h4>Playlists</h4>
            <div className="playlist-container">
                {playlist.map(p => (
                <div className="playlist-item">
                    <div onClick={() => clickHandle(p)}>
                        {p.name}
                    </div>
                    <IconButton onClick={() => loveHandle(p)}>
                        <FavoriteIcon className={following.includes(p) ? classes.heartIcon_active : classes.heartIcon}/>
                    </IconButton>
                </div>))}
            </div>
        </>
    )
}