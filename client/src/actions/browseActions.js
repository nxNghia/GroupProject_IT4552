import axios from "axios";
import { constances as ACTIONS } from "../constances";

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: ACTIONS.FETCH_CATEGORIES_SUCCESS,
        categories
    };
};
  
export const fetchCategoriesError = () => {
    return {
        type: ACTIONS.FETCH_CATEGORIES_ERROR
    };
};
  
export const fetchCategories = (accessToken) => {
    return dispatch => {
        axios.get('http://localhost:8000/genre/getAllChecked').then(response => {
            if (response)
            {
                const genres_list = response.data.map(genre => ({ id: genre.id, name: genre.name, icons: [{ url: genre.image }], href: `https://api.spotify.com/v1/browse/categories/${genre.id}` }))

                dispatch(fetchCategoriesSuccess(genres_list))
            }
        })
    };
};
  
export const fetchNewReleasesSuccess = (newReleases) => {
    return {
        type: ACTIONS.FETCH_NEW_RELEASES_SUCCESS,
        newReleases
    };
};
  
export const fetchNewReleasesError = () => {
    return {
        type: ACTIONS.FETCH_NEW_RELEASES_ERROR
    };
};
  
export const fetchNewReleases = (accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/browse/new-releases`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json()
        }).then(res => {
            dispatch(fetchNewReleasesSuccess(res.albums))
        }).catch(err => {
            dispatch(fetchNewReleasesError(err))
        });
    };
};
  
export const fetchFeaturedSuccess = (featured) => {
    return {
      type: ACTIONS.FETCH_FEATURED_SUCCESS,
      featured
    };
};
  
export const fetchFeaturedError = () => {
    return {
        type: ACTIONS.FETCH_FEATURED_ERROR
    };
};
  
export const fetchFeatured = (accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/browse/featured-playlists`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request).then(res => {
            return res.json();
        }).then(res => {
            dispatch(fetchFeaturedSuccess(res.playlists))
        }).catch(err => {
            dispatch(fetchFeaturedError(err))
        });
    };
};
  
export const fetchGenreSuccess = (genre) => {
    return {
        type: ACTIONS.FETCH_GENRE_SUCCESS,
        genre
    };
};
  
export const fetchGenreError = () => {
    return {
        type: ACTIONS.FETCH_GENRE_ERROR
    };
};
  
export const fetchGenre = (accessToken, genreId) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })

        fetch(request)
        .then(res => {
            return res.json()
        }).then(res => {
          dispatch(fetchFeaturedSuccess(res.playlists))
        }).catch(err => {
          dispatch(fetchFeaturedError(err))
        });
    };
};