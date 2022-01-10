import UserPlaylists from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    fetchPlaylistsMenu,
    fetchPlaylistSongs,
    retrievePlaylistSongs,
    addPlaylistItem,
    createPlaylist,
    updatePlaylist
} from '../../actions/playlistActions';
import { updateHeaderTitle } from '../../actions/uiActions';
import { updateViewType } from "../../actions/songActions";

const mapStateToProps = (state) => {

	return {
		userId: state.userReducer.user ? state.userReducer.user.id : '',
		playlistMenu: state.playlistReducer.playlistMenu ? state.playlistReducer.playlistMenu : '',
		token: state.tokenReducer.token ? state.tokenReducer.token : '',
		title: state.uiReducer.title,
        playlists: state.userReducer.playlists,
        user: state.userReducer.user,
        id: state.uiReducer.id
	};

};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
		fetchPlaylistsMenu,
		fetchPlaylistSongs,
		updateHeaderTitle,
        createPlaylist,
        updatePlaylist,
        retrievePlaylistSongs,
        updateViewType,
        addPlaylistItem
	}, dispatch);

};
export default connect(mapStateToProps, mapDispatchToProps)(UserPlaylists);
