import { constances as ACTIONS } from "../constances";

export const browseReducer = (state = {}, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                view: action.categories,
                fetchCategoriesError: false
            }

        case ACTIONS.FETCH_CATEGORIES_ERROR:
            return {
                ...state,
                fetchCategoriesError: true
            }

        case ACTIONS.FETCH_NEW_RELEASES_SUCCESS:
            return {
                ...state,
                fetchNewReleaseError: false
            }

        case ACTIONS.FETCH_NEW_RELEASES_ERROR:
            return {
                ...state,
                fetchNewReleaseError: true
            }

        case ACTIONS.FETCH_FEATURED_SUCCESS:
            return {
                ...state,
                view: action.featured.items,
                fetchFeaturedError: false
            }

        case ACTIONS.FETCH_FEATURED_ERROR:
            return {
                ...state,
                fetchFeaturedError: true
            }

        case ACTIONS.FETCH_GENRE_SUCCESS:
            return {
                ...state,
                view: action.genre.items,
                fetchGenreError: false
            }

        case ACTIONS.FETCH_GENRE_ERROR:
            return {
                ...state,
                fetchGenreError: true
            }

        default: return state
    }
}