import { constances as ACTIONS } from "../constances";

const defaultState = {
    friendList: [],
    online: [
        {
            id: "1",
            name: "Nghia"
        }
    ],
    currentFriendPlaylist: [],
    currentConnecting: null
}

export const friendsReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_FRIENDSLIST_SUCCESS:
            return {
                ...state,
                friendList: action.list
            }

        case ACTIONS.UPDATE_CURRENT_CONNECTING:
            {
                if(!state.currentConnecting || action.data.id !== state.currentConnecting.id)
                {
                    return {
                        ...state,
                        currentConnecting: action.data.click ? action.data : state.currentConnecting
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
                    console.log("found")
                    friend.newMessage = false
                }

                return state
            }

        case ACTIONS.FETCH_USER_PLAYLIST:
            return {
                ...state,
                currentFriendPlaylist: action.playlist
            }

        default:
            return state
    }
}