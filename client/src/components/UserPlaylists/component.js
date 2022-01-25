import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Button, IconButton, makeStyles, Modal } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    addBtn: {
        color: '#aaa'
    }
}))

const UserPlaylists = ({
    userId,
    user,
    token,
    title,
    playlistMenu,
    fetchPlaylistsMenu,
    fetchPlaylistSongs,
    updateHeaderTitle,
    createPlaylist,
    playlists = [],
    updatePlaylist,
    updateViewType,
    addPlaylistItem,
    retrievePlaylistSongs,
    id,
    blocked
}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [selectdPlaylistId, setSelectedPlaylistId] = useState('')
    const [newName, setNewName] = useState('')

    useEffect(() => {
        if(userId !== '' && token !== '')
        {
            fetchPlaylistsMenu(userId)
        }
    }, [token, userId])

    const selectPlaylistHandle = id => {
        setSelectedPlaylistId(id)
        setOpen(true)
    }
  
    const renderPlaylists = () => {
        return playlistMenu.map((playlist, index) => {
            const getPlaylistSongs = () => {
                if (!blocked)
                {
                    retrievePlaylistSongs(playlist.tracks.songs)
                    updateViewType('playlist')
                    updateHeaderTitle(playlist.name, playlist.id ? playlist.id : playlist._id)
                    addPlaylistItem(playlist)
                }
            };
  
            return (
                <li
                    onClick={getPlaylistSongs}
                    className={
                    id === playlist.id || id === playlist._id
                        ? "active user-playlist-item"
                        : "user-playlist-item"
                    }
                    key={index}
                >
                    <span>{playlist.name}</span>
                    <EditIcon className="edit-btn" onClick={() => selectPlaylistHandle(playlist._id)}/>
                </li>
            );
        });
    }

    const updatePlaylistHandle = () => {
        updatePlaylist(selectdPlaylistId, newName)
        setOpen(false)
        setNewName('')
        setSelectedPlaylistId('')
    }

    const createHandle = () => {
        createPlaylist(user)
        // updateViewType('playlist')
    }
  
    return (
        <div className="user-playlist-container">
            <div className="user-playlist-control">
                <h3 className="user-playlist-header">Playlists</h3>
                <IconButton onClick={createHandle}>
                    <AddIcon className={classes.addBtn}/>
                </IconButton>
            </div>
            {playlistMenu && renderPlaylists()}
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className="modal">
                    <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
                    <Button color="primary" variant="outlined" onClick={updatePlaylistHandle}>Save</Button>
                </div>
            </Modal>
        </div>
    );
}

UserPlaylists.propTypes = {
    userId: PropTypes.string,
    token: PropTypes.string,
    title: PropTypes.string,
    playlistMenu: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fetchPlaylistsMenu: PropTypes.func,
    fetchPlaylistSongs: PropTypes.func,
    updateHeaderTitle: PropTypes.func
};

export default UserPlaylists;
