import Message from "./component";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchFriendsList } from "../../actions/friendActions";

const mapStateToProps = (state) => {
    return {
        messages: state.messageReducer.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchFriendsList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);