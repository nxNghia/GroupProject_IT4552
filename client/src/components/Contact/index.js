import Contact from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFriendsList, setCurrentConnecting, readMessage, addContact, receiveNewMsg } from "../../actions/friendActions";
import { sendMessage } from "../../actions/messageActions";

const mapStateToProps = (state) => {
    return {
        friendsList: state.friendsReducer.friendList,
        rooms: state.friendsReducer.rooms,
        currentConnecting: state.friendsReducer.currentConnecting,
        user: state.userReducer.user,
        newMessages: state.friendsReducer.newMessages,
        friendSearch: state.uiReducer.friendSearch
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFriendsList,
        setCurrentConnecting,
        sendMessage,
        readMessage,
        addContact,
        receiveNewMsg
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);