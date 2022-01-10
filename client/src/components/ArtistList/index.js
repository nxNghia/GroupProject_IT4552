import AlbumList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchArtistsSongs } from "../../actions/artistActions";
import { updateHeaderTitle } from "../../actions/uiActions";

const mapStateToProps = state => {
    return {
        token: state.tokenReducer.token ? state.tokenReducer.token : "",
        artists: state.artistsReducer.artistList
            ? state.artistsReducer.artistList.artists
            : ""
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchArtistsSongs,
            updateHeaderTitle
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
