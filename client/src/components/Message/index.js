import Message from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFriendsList } from "../../actions/friendActions";

const mapStateToProps = (state) => {
    return {
        messages: state.friendsReducer.friendList,
        newMessages: state.friendsReducer.newMessages,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFriendsList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);