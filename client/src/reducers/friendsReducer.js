import { constances as ACTIONS } from "../constances";

const defaultState = {
    friendList: [], //already followed each other
    online: [], //currently online
    currentFriendPlaylist: [],
    currentConnecting: null,
    following: [],
    rooms: [],
    newMessages: [],
    beingFollowed: []
}

export const friendsReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_FRIENDSLIST_SUCCESS:
            const list = action.list.map(l => ({...l, messages: []}))
            return {
                ...state,
                friendList: list
            }

        case ACTIONS.UPDATE_CURRENT_CONNECTING:
            {
                if(!state.currentConnecting || action.data.room !== state.currentConnecting.room)
                {
                    return {
                        ...state,
                        currentConnecting: action.data.click ? action.data : state.currentConnecting,
                        newMessages: action.data.click ? state.newMessages.filter((id => id !== action.data.friendId)) : state.newMessages
                    }
                }else{
                    return {
                        ...state,
                        currentConnecting: action.data.click ? state.currentConnecting : null
                    }
                }
            }

        case ACTIONS.READ_NEW_MESSAGE:
            {
                const friend = state.friendList.find(f => f.id === action.data.id)

                if (friend)
                {
                    friend.newMessage = false
                }

                return state
            }

        case ACTIONS.FETCH_USER_PLAYLIST:
            return {
                ...state,
                currentFriendPlaylist: action.playlist
            }

        case ACTIONS.ADD_NEW_CONTACT:
            return {
                ...state,
                friendList: [...state.friendList, {...action.newContact, messages: []}]
            }

        case ACTIONS.RECEIVE_MESSAGE:
            const friend = state.friendList.find(room => room.room === action.message.room)
            if (friend)
            {
                friend.messages.push({
                    from: action.message.from,
                    content: action.message.content
                })

                return {
                    ...state,
                    newMessages: [...state.newMessages, action.message.from]
                }
            }else{
                return {
                    ...state
                }
            }

        case ACTIONS.FETCH_MESSAGES:
            return {
                ...state,
                friendList: state.friendList.map(friend => ({...friend, messages: action.data.find(item => item.roomId === friend.room)?.messages}))
            }

        case ACTIONS.FETCH_FOLLOWING:
            return {
                ...state,
                following: action.friends
            }

        case ACTIONS.ADD_FOLLOWING:
            return {
                ...state,
                following: [...state.following, action.friend]
            }

        case ACTIONS.FETCH_BEING_FOLLOWED:
            return {
                ...state,
                beingFollowed: action.friends
            }

        default:
            return state
    }
}