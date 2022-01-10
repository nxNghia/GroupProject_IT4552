import { constances as ACTIONS } from '../constances'

export const updateHeaderTitle = (title, id) => {
    console.log(title, id)
    return {
        type: ACTIONS.UPDATE_HEADER_TITLE,
        title,
        id
    }
}