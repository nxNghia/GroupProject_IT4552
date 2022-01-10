import { constances as ACTIONS } from "../constances";
import axios from 'axios'

export const fetchFriendsListSuccess = (friendsList) => {
    return {
        type: ACTIONS.FETCH_FRIENDSLIST_SUCCESS,
        list: friendsList
    }
}

export const fetchFriendsList = (id) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/${id}/friends`).then(response => {
            if(response)
            {
                dispatch(fetchFriendsListSuccess([...response.data, {id: "1", name: "Nghĩa", newMessage: true}, {id: "2", name: "Sơn", newMessage: false}, {id: "3", name: "Đại", newMessage: true}]))
            }
        })
    }
}

export const setCurrentConnecting = (data, open) => {
    return {
        type: ACTIONS.UPDATE_CURRENT_CONNECTING,
        data: {...data, click: open}
    }
}

export const readMessage = (friendId) => {
    return {
        type: ACTIONS.READ_NEW_MESSAGE,
        data: {
            id: friendId
        }
    }
}

export const fetchFriendInfoSuccess = (playlist) => {
    return {
        type: ACTIONS.FETCH_USER_PLAYLIST,
        playlist
    }
}

export const fetchFriendInfo = (friendId) => {
    return dispatch => {
        axios.get(`http://localhost:8000/playlist/${friendId}`)
        .then(response => {
            console.log(response)
            dispatch(fetchFriendInfoSuccess(response.data))
        }).catch(err => console.log(err))
    }
}