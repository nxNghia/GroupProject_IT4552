import SongList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSongs, addSongToLibrary, removeSongFromLibrary } from '../../actions/songActions';
// import { addSongToLibrary } from '../../actions/userActions';
import { addToPlaylist } from '../../actions/playlistActions';

const mapStateToProps = (state) => {

    return {
        token: state.tokenReducer.token ? state.tokenReducer.token : '',
        songs: state.songsReducer.songs ? state.songsReducer.songs : '',
        likedSongs: state.songsReducer.likedSongs,
        fetchSongsError: state.songsReducer.fetchSongsError,
        fetchSongsPending: state.songsReducer.fetchSongsPending,
        fetchPlaylistSongsPending: state.songsReducer.fetchPlaylistSongsPending,
        songPlaying: state.songsReducer.songPlaying,
        songPaused: state.songsReducer.songPaused,
        songId: state.songsReducer.songId,
        songAddedId: state.userReducer.songId || '',
        viewType: state.songsReducer.viewType,
        playlistMenu: state.playlistReducer.playlistMenu,
        // id: state.userReducer.user.id
        id: state.userReducer.user ? state.userReducer.user.id : '',
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        fetchSongs,
        addSongToLibrary,
        removeSongFromLibrary,
        addToPlaylist
    }, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(SongList);
