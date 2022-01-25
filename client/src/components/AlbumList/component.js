import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./style.css";
import {
    IconButton,
    makeStyles
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(() => ({
    heartIcon: {
        color: '#eee'
    },

    heartIcon_active: {
        color: '#056100'
    }
}))

const AlbumList = ({
    audioControl,
    followedPlaylist,
    addPlaylistItem,
    updateHeaderTitle,
    updateViewType 
}) => {
    const classes = useStyles()

    const clickHandle = (playlist) => {
        addPlaylistItem(playlist)
        updateHeaderTitle(playlist.name, playlist._id)
        updateViewType('playlist')
    }

    const renderPlaylists = () => {
        return followedPlaylist.map(playlist => (
            <div key={playlist._id} className="playlist-item">
                <div onClick={() => clickHandle(playlist)}>
                    <div><h3>{playlist.name}</h3></div>
                    <div>by {playlist.owner.display_name}</div>
                </div>
                <IconButton>
                    <FavoriteIcon className={classes.heartIcon_active}/>
                </IconButton>
            </div>
        ))
    }
    return <div className="playlist-container">{renderPlaylists()}</div>;
};

AlbumList.propTypes = {
    songs: PropTypes.array,
    audioControl: PropTypes.func
};

export default AlbumList;
