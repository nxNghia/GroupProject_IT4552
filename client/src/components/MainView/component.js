import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SongList from "../SongList";
import AlbumList from "../AlbumList";
import ArtistList from "../ArtistList";
import BrowseView from "../BrowseView";
import FriendsList from "../FriendsList";
import { FriendPlaylist } from "../FriendsList/FriendPlaylist";
import "./style.css";

const MainView = ({ headerTitle, audioControl, resumeSong, pauseSong, viewType, currentFriendPlaylist, updateViewType, updateHeaderTitle, addPlaylistItem }) => {
    useEffect(() => {
        console.log(viewType)
    }, [viewType])
    
    return (
        <React.Fragment>
            {headerTitle === "Albums" ? (
                <AlbumList audioControl={audioControl} />
            ) : headerTitle === "Artists" ? (
                <ArtistList />
            ) : headerTitle === "Browse" ? (
                <BrowseView />
            ) : headerTitle === "Friends" ? (
                <FriendsList />
            ) : (
        //anything else show SongList
                viewType === "user" ? <FriendPlaylist
                                        playlist={currentFriendPlaylist}
                                        updateViewType={updateViewType}
                                        updateHeaderTitle={updateHeaderTitle}
                                        addPlaylistItem={addPlaylistItem}
                                        /> : <SongList />
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
