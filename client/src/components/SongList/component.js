import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./style.css";
import AddIcon from '@material-ui/icons/Add'
import {
    IconButton,
    makeStyles,
    Modal,
    Tooltip
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
    addIcon: {
        color: '#aaa'
    }
}))

const SongList = ({
    songs = [],
    songId,
    songPaused,
    songPlaying,
    resumeSong,
    audioControl,
    songAddedId,
    token,
    id,
    viewType,
    addSongToLibrary,
    likedSongs,
    fetchSongsPending,
    fetchPlaylistSongsPending,
    removeSongFromLibrary,
    pauseSong,
    fetchSongsError,
    addIntoPlaylist,
    playlistMenu,
    blocked
}) => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [selectSong, setSelectSong] = useState(null)

    const msToMinutesAndSeconds = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    
    const selectSongHandle = (song) => {
        setOpen(true)
        setSelectSong(song)
    }

    const renderSongs = () => {
        const _songs = (viewType === 'songs' ? [...likedSongs] : [...songs])
        return _songs.map((song, i) => {
          const buttonClass =
            song.track.id === songId && !songPaused
              ? "fa-pause-circle-o"
              : "fa-play-circle-o";
          return (
            <li
              className={
                song.track.id === songId
                  ? "active user-song-item"
                  : "user-song-item"
              }
              key={i}
            >
              <div
                onClick={() => {
                  song.track.id === songId &&
                    songPlaying &&
                    songPaused
                    ? resumeSong()
                    : songPlaying &&
                      !songPaused &&
                      song.track.id === songId
                      ? pauseSong()
                      : audioControl(song);
                }}
                className="play-song"
              >
                <i className={`fa ${buttonClass} play-btn`} aria-hidden="true" />
              </div>
    
              {viewType !== "songs" && (
                <p
                  className="add-song"
                  onClick={() => {
                    if(!likedSongs.some(_song => _song.track.id === song.track.id))
                        addSongToLibrary(token, song, id);
                    else
                        removeSongFromLibrary(song, id)
                  }}
                >
                  {likedSongs.some(_song => _song.track.id === song.track.id) ? (
                    <i className="fa fa-check add-song" aria-hidden="true" />
                  ) : (
                      <i className="fa fa-plus add-song" aria-hidden="true" />
                    )}
                </p>
              )}
    
              {viewType === "songs" && (
                <p
                    className="add-song"
                    onClick={() => removeSongFromLibrary(song, id)}
                >
                  <i className="fa fa-check" aria-hidden="true" />
                </p>
              )}
    
              <div className="song-title">
                <p>{song.track.name}</p>
              </div>
    
              <div className="song-artist">
                <p>{song.track.artists[0].name}</p>
              </div>
    
              <div className="song-album">
                <p>{song.track.album.name}</p>
              </div>
    
              <div className="song-added">
                <p>{moment(song.track.added_at).format("YYYY-MM-DD")}</p>
              </div>
    
              <div className="song-length">
                <p>{msToMinutesAndSeconds(song.track.duration_ms)}</p>
              </div>

              <div>
                <IconButton onClick={() => selectSongHandle(song)}>
                    <Tooltip title="Add to playlist">
                        <AddIcon className={classes.addIcon}/>
                    </Tooltip>
                </IconButton>
              </div>
            </li>
          );
        });
      }

    const addIntoPlaylistHandle = (playlistId) => {
        setOpen(false)
        addIntoPlaylist(playlistId, selectSong)
    }

    return (
        <div>
        <div className="song-header-container">
            <div className="song-title-header">
                <p>Title</p>
            </div>

            <div className="song-artist-header">
                <p>Artist</p>
            </div>

            <div className="song-album-header">
                <p>Album</p>
            </div>

            <div className="song-added-header">
                <i className="fa fa-calendar-plus-o" aria-hidden="true" />
            </div>

            <div className="song-length-header">
                <p>
                    <i className="fa fa-clock-o" aria-hidden="true" />
                </p>
            </div>
        </div>

        {/* {songs &&
            !fetchSongsPending &&
            !fetchPlaylistSongsPending &&
            renderSongs()} */}
            {!blocked && (songs || likedSongs) && renderSongs()}

        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="modal playlist-modal">
                {playlistMenu && playlistMenu.map(playlist => (
                    <div key={playlist._id} onClick={() => addIntoPlaylistHandle(playlist._id)}>{playlist.name}</div>
                ))}
                {playlistMenu && playlistMenu.length === 0 && <p>Seem like you don't have any playlist. How about create one?</p>}
            </div>
        </Modal>
        </div>
    );
}

SongList.propTypes = {
    viewType: PropTypes.string,
    token: PropTypes.string,
    songAddedId: PropTypes.string,
    songId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    songs: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fetchSongsError: PropTypes.bool,
    fetchSongsPending: PropTypes.bool,
    fetchPlaylistSongsPending: PropTypes.bool,
    fetchSongs: PropTypes.func,
    audioControl: PropTypes.func,
    songPaused: PropTypes.bool,
    songPlaying: PropTypes.bool,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func,
    addSongToLibrary: PropTypes.func,
};

export default SongList;
