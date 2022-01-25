import { constances as ACTIONS } from "../constances";
import axios from 'axios'
import { socket } from '../socket/socket'

export const fetchFriendsListSuccess = (friendsList) => {
    const friends = []

    for (let i = 0; i < 15; ++i)
    {
        friends.push({
            room: i + 'a ',
            friendId: i + 'a ',
            image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 69 + 1)}`,
            name: 'Test user'
        })
    }

    return {
        type: ACTIONS.FETCH_FRIENDSLIST_SUCCESS,
        list: [...friendsList, ...friends]
    }
}

export const fetchFriendsList = (id) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/${id}/friends`).then(response => {
            if(response)
            {
                dispatch(fetchFriendsListSuccess([...response.data]))
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
            dispatch(fetchFriendInfoSuccess(response.data))
        }).catch(err => console.log(err))
    }
}

export const createFollow = (userId, friendId) => {
        socket.emit('create-follow', { userId, friendId })
}

export const addContact = (newContact) => {
    return dispatch => {
        dispatch({
            type: ACTIONS.ADD_NEW_CONTACT,
            newContact: newContact
        })
    }
}

export const receiveNewMsg = (message) => {
    return dispatch => {
        dispatch({
            type: ACTIONS.RECEIVE_MESSAGE,
            message: message
        })
    }
}

export const fetchFollowing = (friends) => {
    return {
        type: ACTIONS.FETCH_FOLLOWING,
        friends: friends
    }
}

export const fetchBeingFollowed = (friends) => {
    return {
        type: ACTIONS.FETCH_BEING_FOLLOWED,
        friends: friends
    }
}

export const addFollowing = (friend) => {
    return {
        type: ACTIONS.ADD_FOLLOWING,
        friend: friend
    }
}