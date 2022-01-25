import MainView from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateViewType } from "../../actions/songActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import { addPlaylistItem, followPlaylist, retrievePlaylistSongs } from "../../actions/playlistActions";

const mapStateToProps = (state) => {
    return {
        headerTitle: state.uiReducer.title,
        viewType: state.songsReducer.viewType,
        currentFriendPlaylist: state.friendsReducer.currentFriendPlaylist,
        user: state.userReducer.user,
        miniTitle: state.uiReducer.miniTitle,
        followedPlaylist: state.playlistReducer.followedPlaylist
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateViewType,
            updateHeaderTitle,
            addPlaylistItem,
            followPlaylist,
            retrievePlaylistSongs
        },dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
