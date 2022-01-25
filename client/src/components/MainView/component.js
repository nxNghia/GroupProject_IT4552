import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SongList from "../SongList";
import AlbumList from "../AlbumList";
import ArtistList from "../ArtistList";
import BrowseView from "../BrowseView";
import FriendsList from "../FriendsList";
import { FriendPlaylist } from "../FriendsList/FriendPlaylist";
import "./style.css";

const MainView = ({
    headerTitle,
    audioControl,
    resumeSong,
    pauseSong,
    viewType,
    currentFriendPlaylist,
    updateViewType,
    updateHeaderTitle,
    followedPlaylist,
    addPlaylistItem,
    followPlaylist,
    retrievePlaylistSongs,
    user,
    miniTitle
}) => {
    return (
        <React.Fragment>
            {headerTitle === "Playlists" ? (
                <AlbumList audioControl={audioControl} />
            ) : headerTitle === "Artists" ? (
                <ArtistList />
            ) : headerTitle === "Browse" ? (
                <BrowseView />
            ) : headerTitle === "Friends" ? (
                <FriendsList miniTitle={miniTitle}/>
            ) : (
        //anything else show SongList
                viewType === "user" ? <FriendPlaylist
                                        playlist={currentFriendPlaylist}
                                        updateViewType={updateViewType}
                                        updateHeaderTitle={updateHeaderTitle}
                                        addPlaylistItem={addPlaylistItem}
                                        followPlaylist={followPlaylist}
                                        followedPlaylist={followedPlaylist}
                                        retrievePlaylistSongs={retrievePlaylistSongs}
                                        user={user}
                                        /> : <SongList
                                                audioControl={audioControl}
                                                resumeSong={resumeSong}
                                                pauseSong={pauseSong}
                                            />
            )}
        </React.Fragment>
    );
};

MainView.propTypes = {
    headerTitle: PropTypes.string,
    audioControl: PropTypes.func,
    resumeSong: PropTypes.func,
    pauseSong: PropTypes.func
};

export default MainView;
