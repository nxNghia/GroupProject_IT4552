import { constances as ACTIONS } from "../constances";
import axios from "axios";

export const fetchAvailableGenre = () => {
    return dispatch => {
        axios.get('http://localhost:8000/genre/getAllChecked').then(response => {
            if (response)
            {
                const genres_list = response.data.map(genre => ({ id: genre.id, name: genre.name, icons: [{ url: genre.image }], href: `https://api.spotify.com/v1/browse/categories/${genre.id}` }))

                dispatch({
                    type: ACTIONS.FETCH_GENRES_LIST,
                    genres: genres_list
                })
            }
        })
    }
}