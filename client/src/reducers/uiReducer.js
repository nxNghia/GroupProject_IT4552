import { constances as ACTIONS } from "../constances";

const defaultState = {
    title: 'Songs',
    id: ''
}

export const uiReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.UPDATE_HEADER_TITLE:
            return {
                ...state,
                title: action.title,
                id: action.id ? action.id : ''
            }

        default: return state
    }
}