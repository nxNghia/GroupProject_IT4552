import AlbumList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateHeaderTitle } from "../../actions/uiActions";
import { updateViewType } from "../../actions/songActions";
import { addPlaylistItem } from '../../actions/playlistActions'
const mapStateToProps = state => {
    return {
        followedPlaylist: state.playlistReducer.followedPlaylist
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addPlaylistItem,
        updateViewType,
        updateHeaderTitle
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
