import Contact from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFriendsList, setCurrentConnecting, readMessage } from "../../actions/friendActions";
import { sendMessage } from "../../actions/messageActions";

const mapStateToProps = (state) => {
    return {
        friendsList: state.friendsReducer.friendList,
        currentConnecting: state.friendsReducer.currentConnecting,
        userImage: state.userReducer.user && state.userReducer.user.images[0] ? state.userReducer.user.images[0].url : '',
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFriendsList,
        setCurrentConnecting,
        sendMessage,
        readMessage
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);