import { updateHeaderTitle } from '../../actions/uiActions';
import { updateViewType } from '../../actions/songActions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Friend from "./component";

const mapStateToProps = (state) => {

    return {
      title: state.uiReducer.title
    };
  
};

const mapDispatchToProps = (dispatch) => {

return bindActionCreators({
    updateHeaderTitle,
    updateViewType
}, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(Friend);