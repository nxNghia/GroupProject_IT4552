import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MainHeader.css';
import blank from '../../assets/blank.png'

const MainHeader = ({
    pauseSong,
    resumeSong,
    fetchCategories,
    fetchNewReleases,
    fetchFeatured,
    updateHeaderTitle,
    removePlaylist,
    updateViewType,
    fetchSongs,
    songPaused,
    headerTitle,
    viewType,
    playlists,
    token,
    artists,
    id,
    user
}) => {

    let currentPlaylist
    let currentArtist

    if (viewType === 'playlist') {
        currentPlaylist = playlists.filter(playlist => {
            return playlist.id === id || playlist._id === id;
        })[0];
    }

    if (viewType === 'Artist' && artists.length > 0) {
        currentArtist = artists.filter(artist => {
            return artist.name === headerTitle;
        })[0];
    }

    const handleRemove = () => {
        removePlaylist(currentPlaylist._id)
        updateHeaderTitle('Songs')
        updateViewType('songs')
        fetchSongs(token, user.id)
    }

    return (
        <div className='section-title'>
            {viewType === 'playlist' && (
                <div className='playlist-title-container'>
                    <div className='playlist-image-container'>
                        <img alt="playlist" className='playlist-image' width={230} height={230} src={currentPlaylist.images[0] ? currentPlaylist.images[0].url : blank} />
                    </div>
                    <div className='playlist-info-container'>
                        <p className='playlist-text'>PLAYLIST</p>
                        <h3 className='header-title'>{headerTitle}</h3>
                        <p className='created-by'>Created By: <span className='lighter-text'>{currentPlaylist.owner.display_name}</span> - {currentPlaylist.tracks.total} songs</p>
                        <button
                            onClick={!songPaused ? pauseSong : resumeSong}
                            className='main-pause-play-btn'>
                            {songPaused ? 'PLAY' : 'PAUSE'}
                        </button>
                        {user.display_name === currentPlaylist.owner.display_name && <button className='main-remove-btn' onClick={handleRemove}>Remove</button>}

                    </div>
                </div>
            )}

            {viewType === 'user' && (
                <div className='user-info-container'>
                    <img alt='user' src={user.images[0].url} />
                    <div>
                        <h3>{headerTitle}</h3>
                        <ul>
                            <li>Follower: 60</li>
                            <li>Following: 160</li>
                        </ul>
                    </div>
                </div>    
            )}

            {viewType === 'Artist' && currentArtist && (
                <div>
                    <div className='current-artist-header-container'>
                        <img alt="current-artist" className='current-artist-image' src={currentArtist.images[0].url} />
                        <div className='current-artist-info'>
                            <p>Artist from your library</p>
                            <h3>{currentArtist.name}</h3>
                        </div>
                    </div>
                    <button
                        onClick={!songPaused ? pauseSong : resumeSong}
                        className='main-pause-play-btn artist-button'>
                        {songPaused ? 'PLAY' : 'PAUSE'}
                    </button>
                </div>
            )}

            {(
                headerTitle === 'Songs' ||
                headerTitle === 'Recently Played' ||
                headerTitle === 'Albums' ||
                headerTitle === 'Artists' ||
                headerTitle === 'Friends' ) && (
                    <div>
                        <h3 className='header-title'>{headerTitle}</h3>
                        {(headerTitle !== 'Artists' && headerTitle !== 'Friends') && (
                            <button
                                onClick={!songPaused ? pauseSong : resumeSong}
                                className='main-pause-play-btn'>
                                {songPaused ? 'PLAY' : 'PAUSE'}
                            </button>
                        )}

                    </div>
            )}
    
            {(headerTitle === 'Browse') && (
                <div>
                    <h3 className='header-title'>{headerTitle}</h3>
                    <div className='browse-headers'>
                        <p className={viewType === 'Genres' ? 'active' : ''} onClick={() => { fetchCategories(token); updateViewType('Genres'); updateHeaderTitle('Browse'); }}>Genres</p>
                        <p className={viewType === 'New Releases' ? 'active' : ''} onClick={() => { fetchNewReleases(token); updateViewType('New Releases'); updateHeaderTitle('Browse'); }}>New Releases</p>
                        <p className={viewType === 'Featured' ? 'active' : ''} onClick={() => { fetchFeatured(token); updateViewType('Featured'); updateHeaderTitle('Browse'); }}>Featured</p>
                    </div>
                </div>
            )}
        </div>
    );
};

MainHeader.propTypes = {
    pauseSong: PropTypes.func,
    resumeSong: PropTypes.func,
    fetchCategories: PropTypes.func,
    fetchNewReleases: PropTypes.func,
    fetchFeatured: PropTypes.func,
    updateHeaderTitle: PropTypes.func,
    updateViewType: PropTypes.func,
    songPaused: PropTypes.bool,
    headerTitle: PropTypes.string,
    viewType: PropTypes.string,
    playlists: PropTypes.array,
    playlistMenu: PropTypes.array,
    token: PropTypes.string,
    artists: PropTypes.array,
};

export default MainHeader;
