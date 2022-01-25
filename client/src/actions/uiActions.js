import { constances as ACTIONS } from '../constances'

export const updateHeaderTitle = (title, id, imgurl) => {
    return {
        type: ACTIONS.UPDATE_HEADER_TITLE,
        title,
        id,
        imgurl
    }
}

export const updateMiniTitle = (miniTitle) => {
    return dispatch => {
        dispatch({
            type: ACTIONS.UPDATE_MINI_TITLE,
            miniTitle: miniTitle
        })
    }
}

export const searchFriend = (name) => {
    return dispatch => {
        dispatch({
            type: ACTIONS.SEARCH_FRIENDS,
            name: name
        })
    }
}