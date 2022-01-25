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

export const FriendPlaylist = ({playlist, updateHeaderTitle, updateViewType, addPlaylistItem, followPlaylist, user, followedPlaylist, retrievePlaylistSongs}) => {
    const classes = useStyles()
    const [following, setFollowing] = useState([])

    const clickHandle = (p) => {
        retrievePlaylistSongs(p.tracks.songs)
        addPlaylistItem(p)
        updateHeaderTitle(p.name, p._id)
        updateViewType('playlist')
    }

    const loveHandle = (p) => {
        followPlaylist(p._id, user.id)
        if (!following.includes(p))
            setFollowing([...following, p])
        else
            setFollowing(following => following.filter(i => i._id !== p._id))
    }

    return (
        <>
            <h4>Playlists</h4>
            <div className="playlist-container">
                {playlist.map(p => (
                <div key={p._id} className="playlist-item">
                    <div onClick={() => clickHandle(p)}>
                        {p.name}
                    </div>
                    <IconButton onClick={() => loveHandle(p)}>
                        <FavoriteIcon className={(following.includes(p) || followedPlaylist.some(_p => _p._id === p._id)) ? classes.heartIcon_active : classes.heartIcon}/>
                    </IconButton>
                </div>))}
            </div>
        </>
    )
}