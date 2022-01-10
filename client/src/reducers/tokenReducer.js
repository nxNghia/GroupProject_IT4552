import { constances as ACTIONS } from "../constances";

export const tokenReducer = (state = {}, action) => {
    switch (action.type)
    {
        case ACTIONS.SET_TOKEN:
            return {
                ...state,
                token: action.token
            }

        default: return state
    }
}