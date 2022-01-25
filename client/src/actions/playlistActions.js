import { constances as ACTIONS } from "../constances";
import axios from 'axios'

import uniqBy from 'lodash/uniqBy';
import { updateHeaderTitle } from "./uiActions";
import { updateViewType } from './songActions';

export const fetchPlaylistMenuPending = () => {
    return {
        type: ACTIONS.FETCH_PLAYLIST_MENU_PENDING
    };
};

export const fetchPlaylistMenuSuccess = (playlists) => {
    return {
        type: ACTIONS.FETCH_PLAYLIST_MENU_SUCCESS,
        playlists
    };
};

export const fetchPlaylistMenuError = () => {
    return {
        type: ACTIONS.FETCH_PLAYLIST_MENU_ERROR
    };
};

export const addPlaylistItem = (playlist) => {
    return {
        type: ACTIONS.ADD_PLAYLIST_ITEM,
        playlist
    };
};

export const fetchPlaylistsMenu = (userId, accessToken) => {
    return dispatch => {
    //     const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    //         headers: new Headers({
    //             'Authorization': 'Bearer ' + accessToken
    //     })
    // });

    dispatch(fetchPlaylistMenuPending());

    axios.get(`http://localhost:8000/playlist/${userId}`)
    .then(response => {
        dispatch(fetchPlaylistMenuSuccess(response.data))
    }).catch(err => dispatch(fetchPlaylistMenuError(err)))

    // fetch(request)
    //     .then(res => {
    //         if(res.statusText === "Unauthorized") {
    //             window.location.href = './';
    //         }

    //         return res.json();
    //     }).then(res => {
    //         console.log(res.items)
    //         dispatch(fetchPlaylistMenuSuccess(res.items));
    //     }).catch(err => {
    //         dispatch(fetchPlaylistMenuError(err));
    //     });
    };
};


export const fetchPlaylistSongsPending = () => {
    return {
        type: ACTIONS.FETCH_PLAYLIST_SONGS_PENDING
    };
};

export const fetchPlaylistSongsSuccess = (songs) => {
    return {
        type: ACTIONS.FETCH_PLAYLIST_SONGS_SUCCESS,
        songs
    };
};

export const fetchPlaylistSongsError = () => {
    return {
        type: ACTIONS.FETCH_PLAYLIST_SONGS_ERROR
    };
};

// export const fetchUPlaylistSongs = (playlistId) => {
//     return dispatch => {
//         axios.get(`http://localhost:8000/playlist/get/${playlistId}`).then(response => {
//             if(response.)
//         })
//     }
// }

export const fetchPlaylistSongs = (userId, playlistId, accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        dispatch(fetchPlaylistSongsPending());

        fetch(request)
            .then(res => {
                return res.json();
            }).then(res => {
                //remove duplicate tracks
                res.items = uniqBy(res.items, (item) => {
                return item.track.id;
            });

                dispatch(fetchPlaylistSongsSuccess(res.items));
            }).catch(err => {
                console.log(err)
                dispatch(fetchPlaylistSongsError(err));
            });
    };
};


export const retrievePlaylistSongs = (songs) => {
    return dispatch => {
        dispatch(fetchPlaylistSongsSuccess(songs))
    }
}

export const updatePlaylist = (id, name) => {
    return dispatch => {
        axios.post('http://localhost:8000/playlist/update', { playlist_id: id, new_name: name }).then(response => {
            dispatch(updateHeaderTitle(response.data.result.name, id))
            dispatch({
                type: ACTIONS.UPDATE_USER_PLAYLIST,
                data: response.data
            })
        })
    }
}

export const createPlaylist = (user) => {
    const new_playlist = {
        _id: '',
        name: 'New playlist',
        images: [],
        owner: user,
    }

    return dispatch => {
        axios.post('http://localhost:8000/playlist/create', { playlist_info: {
            name: new_playlist.name,
            images: [],
            tracks: {
                songs: [],
                total: 0,
            },
            owner: user
        } }).then(response => {
            dispatch(addPlaylistItem(response.data.result))
            dispatch(updateHeaderTitle(response.data.result.name, response.data.result._id))
            dispatch(updateViewType('playlist'))
            dispatch(retrievePlaylistSongs(response.data.result.tracks.songs))
            dispatch({
                type: ACTIONS.CREATE_PLAYLIST,
                newPlaylist: response.data.result
            })
        })
    }
}

export const removePlaylist = (id) => {
    return dispatch => {
        axios.post('http://localhost:8000/playlist/remove', { id: id }).then(response => {
            dispatch({
                type: ACTIONS.REMOVE_PLAYLIST,
                data: response.data
            })
        })
    }
}

export const fetchUPlaylist = (id) => {
    return dispatch => {
        axios.get(`http://localhost:8000/playlist/else/${id}`).then(response => {
            dispatch({
                type: ACTIONS.FETCH_UPLAYLIST,
                uPlaylists: response.data.playlists
            })
        })
    }
}

export const followPlaylistSuccess = (playlists) => {
    return {
        type: ACTIONS.FOLLOW_PLAYLIST_SUCCESS,
        playlists: playlists
    }
}

export const followPlaylistError = () => {
    return {
        type: ACTIONS.FOLLOW_PLAYLIST_ERROR
    }
}

export const fetchFollowedPlaylists = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8000/playlist/followed/${userId}`)
        .then(response => {
            if (response && response.data.message === 'Success')
            {
                dispatch(followPlaylistSuccess(response.data.playlists))
            }else{
                dispatch(followPlaylistError())
            }
        }).catch(() => dispatch(followPlaylistError()))
    }
}

export const followPlaylist = (playlist_id, user_id) => {
    return dispatch => {
        axios.post('http://localhost:8000/playlist/follow', { user_id, playlist_id })
        .then(response => {
            if (response && response.data.message === 'Success')
            {
                dispatch(followPlaylistSuccess(response.data.playlists))
            }else{
                dispatch(followPlaylistError())
            }
        }).catch(() => {
            dispatch(followPlaylistError())
        })
    }
}

export const addIntoPlaylistError = () => {
    return {
        type: ACTIONS.ADD_INTO_PLAYLIST_ERROR
    }
}

export const addIntoPlaylistSuccess = (playlistId, song) => {
    return {
        type: ACTIONS.ADD_INTO_PLAYLIST,
        data: {
            song: song,
            playlistId: playlistId
        }
    }
}

export const addIntoPlaylist = (playlist_id, song) => {
    return dispatch => {
        axios.post('http://localhost:8000/playlist/add', { playlist_id: playlist_id, song: song })
        .then(response => {
            if (response.data.message !== 'Success')
                dispatch(addIntoPlaylistError())
            else
                dispatch(addIntoPlaylistSuccess(playlist_id, song))
        })
    }
}