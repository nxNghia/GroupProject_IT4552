import MainView from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateViewType } from "../../actions/songActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import { addPlaylistItem } from "../../actions/playlistActions";

const mapStateToProps = (state) => {
    return {
        headerTitle: state.uiReducer.title,
        viewType: state.songsReducer.viewType,
        currentFriendPlaylist: state.friendsReducer.currentFriendPlaylist
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateViewType,
            updateHeaderTitle,
            addPlaylistItem
        },dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
