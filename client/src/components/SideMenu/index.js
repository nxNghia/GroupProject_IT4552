import SideMenu from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSongs, fetchRecentlyPlayed, updateViewType } from '../../actions/songActions';
import { fetchAlbums } from '../../actions/albumActions';
import { fetchArtists } from '../../actions/artistActions';
import { fetchCategories } from '../../actions/browseActions';
import { updateHeaderTitle } from '../../actions/uiActions';

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.user ? state.userReducer.user.id : '',
        token: state.tokenReducer.token ? state.tokenReducer.token : '',
        artistIds: state.artistsReducer.artistIds,
        title: state.uiReducer.title,
        blocked: state.userReducer.blocked
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchRecentlyPlayed,
        fetchSongs,
        fetchAlbums,
        fetchArtists,
        fetchCategories,
        updateViewType,
        updateHeaderTitle,
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
