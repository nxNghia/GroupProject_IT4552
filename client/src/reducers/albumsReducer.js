import { constances as ACTIONS } from "../constances"

export const albumsReducer = (state = {}, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_ALBUMS_PENDING:
            return {
                ...state,
                fetchAlbumsPending: true
            }

        case ACTIONS.FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: action.albums,
                fetchAlbumsError: false,
                fetchAlbumsPending: false
            }

        case ACTIONS.FETCH_ALBUMS_ERROR:
            return {
                ...state,
                fetchAlbumsError: true,
                fetchAlbumsPending: false
            }

        default: return state
    }
}