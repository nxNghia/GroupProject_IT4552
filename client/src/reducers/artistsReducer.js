import { constances as ACTIONS } from "../constances"

const defaultState = {
    artistIds: ''
}

export const artistsReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.SET_ARTIST_IDS:
            return {
                ...state,
                artistIds: action.artistIds
            }

        case ACTIONS.FETCH_ARTISTS_PENDING:
            return {
                ...state,
                fetchArtistsPending: true
            }

        case ACTIONS.FETCH_ARTISTS_ERROR:
            return {
                ...state,
                fetchArtistsError: true,
                fetchArtistsPending: false
            }

        case ACTIONS.FETCH_ARTISTS_SUCCESS:
            return {
                ...state,
                artistsList: action.artists,
                fetchArtistsError: false,
                fetchArtistsPending: false
            }

        default: return state
    }
}