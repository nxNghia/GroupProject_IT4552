import FriendList from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFriendsList, fetchFriendInfo, addFollowing } from "../../actions/friendActions";
import { updateViewType } from "../../actions/songActions";
import { updateHeaderTitle } from "../../actions/uiActions";
import { reportBegin, reportConfirm } from '../../actions/userActions'

const mapStateToProps = (state) => {
    return {
        other_users: state.userReducer.other_users,
        id: state.userReducer.user.id,
        followedPlaylist: state.userReducer.followedPlaylist,
        friendList: state.friendsReducer.friendList,
        following: state.friendsReducer.following,
        beingFollowed: state.friendsReducer.beingFollowed,
        report_message: state.userReducer.report_message,
        raise_report_modal: state.userReducer.raise_report_modal,
        reportId: state.userReducer.reportId
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFriendsList,
        fetchFriendInfo,
        updateViewType,
        updateHeaderTitle,
        addFollowing,
        reportConfirm,
        reportBegin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);