import { constances as ACTIONS } from "../constances";

export const soundReducer = (state = { volume: 1000 }, action) => {
    switch (action.type)
    {
        case ACTIONS.UPDATE_VOLUME:
            return {
                ...state,
                volumn: action.volume
            }

        default: return state
    }
}