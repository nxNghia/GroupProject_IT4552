import { constances as ACTIONS } from "../constances";

export const sendMessage = (socket, msg) => {
    socket.emit('sendMsg', msg)
    // console.log(msg)
    return dispatch => {
        dispatch({
            type: ACTIONS.SENT_MESSAGE,
            message: msg
        })
    }
}