import FriendList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFriendsList, fetchFriendInfo } from "../../actions/friendActions";
import { updateViewType } from "../../actions/songActions";
import { updateHeaderTitle } from "../../actions/uiActions";

const mapStateToProps = (state) => {
    return {
        friendsList: state.friendsReducer.friendList,
        id: state.userReducer.user.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFriendsList,
        fetchFriendInfo,
        updateViewType,
        updateHeaderTitle
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);