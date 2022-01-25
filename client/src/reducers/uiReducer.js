import { constances as ACTIONS } from "../constances";

const defaultState = {
    title: 'Songs',
    id: '',
    imgurl: '',
    miniTitle: '',
    friendSearch: ''
}

export const uiReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.UPDATE_HEADER_TITLE:
            return {
                ...state,
                title: action.title,
                id: action.id ? action.id : '',
                imgurl: action.imgurl ? action.imgurl : ''
            }
        
        case ACTIONS.UPDATE_MINI_TITLE:
            return {
                ...state,
                miniTitle: action.miniTitle
            }

        case ACTIONS.SEARCH_FRIENDS:
            return {
                ...state,
                friendSearch: action.name
            }

        default: return state
    }
}