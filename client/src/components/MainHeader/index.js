import MainHeader from "./component";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    fetchCategories,
    fetchNewReleases,
    fetchFeatured
} from "../../actions/browseActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import { updateViewType, fetchSongs } from "../../actions/songActions";
import { removePlaylist } from "../../actions/playlistActions";

const mapStateToProps = state => {
    return {
        songPaused: state.songsReducer.songPaused,
        headerTitle: state.uiReducer.title,
        viewType: state.songsReducer.viewType,
        playlists: state.playlistReducer.playlists,
        artists: state.artistsReducer.artistList
            ? state.artistsReducer.artistList.artists
            : [],
        token: state.tokenReducer.token,
        id: state.uiReducer.id,
        user: state.userReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchCategories,
            fetchNewReleases,
            updateHeaderTitle,
            updateViewType,
            fetchFeatured,
            removePlaylist,
            fetchSongs
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
