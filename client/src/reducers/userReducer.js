import { constances as ACTIONS } from "../constances";

export const userReducer = (state = {}, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                fetchUserError: false
            }

        case ACTIONS.FETCH_USER_ERROR:
            return {
                ...state,
                fetchUserError: true
            }

        default: return state
    }
}