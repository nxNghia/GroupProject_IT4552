import { constances as ACTIONS } from "../constances";
import { socket } from "../socket/socket";
import axios from 'axios'

export const sendMessage = (msg) => {
    socket.emit('sendMsg', msg)

    return dispatch => {
        dispatch({
            type: ACTIONS.SENT_MESSAGE,
            message: msg
        })
    }
}

export const fetchMessages = (user) => {
    return dispatch => {
        axios.get(`http://localhost:8000/room/${user}`).then(response => {
            dispatch({
                type: ACTIONS.FETCH_MESSAGES,
                data: response.data.data
            })
        })
    }
}