import { constances as ACTIONS } from '../constances'
import axios from "axios";
import { fetchSongs } from './songActions'
import { fetchFriendsList } from "./friendActions";

export const fetchUserSuccess = (user, accessToken) => {
    return dispatch => {
        dispatch(fetchSongs(accessToken, user.id))
        dispatch({
            type: ACTIONS.FETCH_USER_SUCCESS,
            user
        })
    };
};

export const fetchUserError = () => {
    return {
        type: ACTIONS.FETCH_USER_ERROR
    };
};

export const fetchUser = (accessToken) => {
    return dispatch => {
        const request = new Request('https://api.spotify.com/v1/me', {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        fetch(request)
            .then(res => {
                // send user back to homepage if no token
                if(res.statusText === "Unauthorized") {
                    window.location.href = './';
                }

                return res.json();
            }).then(res => {
                dispatch(fetchUserSuccess(res, accessToken));
                return res
            }).then(res => {
                dispatch(fetchFriendsList(res.id))
            }).catch(err => {
                dispatch(fetchUserError(err));
            });
    };
};

export const addSongToLibrarySuccess = (song) => {
    return {
        type: ACTIONS.ADD_SONG_TO_LIBRARY_SUCCESS,
        song
    };
};

export const addSongToLibraryError = () => {
    return {
        type: ACTIONS.ADD_SONG_TO_LIBRARY_ERROR
    };
};

export const addSongToLibrary = (accessToken, song, userId) => {
    return dispatch => {
        
        // add id into songsReducer then save into db user.likedSong
        axios.post(`http://localhost:8000/track/liked`, {
            userId: userId,
            songId: song.track.id
        }).then(response => {
            console.log(response.data)
        })

        dispatch(addSongToLibrarySuccess(song));

    // const request = new Request(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
    //   method: 'PUT',
    //   headers: new Headers({
    //     'Authorization': 'Bearer ' + accessToken
    //   })
    // });

    // fetch(request).then(res => {
    //   if(res.ok) {
    //   }
    // }).catch(err => {
    //   dispatch(addSongToLibraryError(err));
    // });
  };
};

export const addToPlaylist = (playlistId, song) => {
    return dispatch => dispatch({
        type: ACTIONS.ADD_INTO_PLAYLIST,
        data: {
            song: song,
            playlistId: playlistId
        }
    })
}

export const updatePlaylist = (id, name) => {
    return dispatch => dispatch({
        type: ACTIONS.UPDATE_USER_PLAYLIST,
        data: {
            id: id,
            name: name
        }
    })
}