import { constances as ACTIONS } from '../constances'
import axios from "axios";
import { fetchSongs } from './songActions'
import { fetchFollowing, fetchBeingFollowed, fetchFriendsListSuccess } from "./friendActions";
import { socket } from '../socket/socket';
import { fetchMessages } from './messageActions';
import { fetchAvailableGenre } from './genresActions';

export const fetchUserSuccess = (user, accessToken) => {
    return dispatch => {
        axios.post('http://localhost:8000/user/signin', { user: user }).then(response => {
            dispatch(fetchUsers(user.id))
            dispatch(fetchFriendsListSuccess(response.data.user.follow))
            dispatch(fetchSongs(accessToken, user.id))
            dispatch({
                type: ACTIONS.FETCH_USER_SUCCESS,
                user
            })
            dispatch({
                type: ACTIONS.UPDATE_USER_STATUS,
                blocked: response.data.user.blocked
            })
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
                dispatch(fetchFollowedPlaylists(res.id))
                dispatch(fetchMessages(res.id))
                dispatch(fetchFollowingPending(res.id))
                dispatch(fetchBeingFollowedPending(res.id))
                dispatch(fetchAvailableGenre())
                socket.emit('init', res.id)
            }).catch(err => {
                dispatch(fetchUserError(err));
            });
    };
};

export const fetchFollowingPending = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/following/${userId}`).then(response => {
            dispatch(fetchFollowing(response.data.data))
        })
    }
}

export const fetchBeingFollowedPending = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/beFollowed/${userId}`).then(response => {
            dispatch(fetchBeingFollowed(response.data.data))
        })
    }
}

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

export const fetchUsers = (id) => {
    return dispatch => {
        axios.get(`http://localhost:8000/user/getOther/${id}`)
        .then(response => {
            const users = []

            for(let i = 0; i < 10; ++i)
            {
                users.push({
                    _id: i + ' ',
                    token: i + ' ',
                    name: 'Test user',
                    follow: [],
                    liked_song: [],
                    images: [
                        {
                            url: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 69 + 1)}`
                        }
                    ],
                    follow_playlists: [],
                    being_followed: [],
                    following: [],
                    blocked: false,
                    reported: false
                })
            }

            dispatch({
                type: ACTIONS.FETCH_USERS,
                users: [...response.data.users, ...users]
            })
        })
    }
}

export const fetchFollowedPlaylists = (userId) => {
    return dispatch => {
        axios.get(`http://localhost:8000/playlist/followed/${userId}`)
        .then(response => {
            dispatch({
                type: ACTIONS.FOLLOW_PLAYLIST_SUCCESS,
                playlists: response.data.playlists
            })
        })
    }
}

export const report = (userId) => {
    return dispatch => {
        axios.post('http://localhost:8000/user/report', {id: userId}).then(response => {
            if (response.data.message === 'Success')
            {
                dispatch({
                    type: ACTIONS.REPORT_SENT
                })
            }else{
                dispatch({
                    type: ACTIONS.REPORT_ERROR
                })
            }
        })
    }
}

export const reportBegin = (open, id) => {
    return dispatch => {
        dispatch({
            type: ACTIONS.REPORT_BEGIN,
            open: open,
            userId: id
        })
    }
}

export const reportConfirm = (userId) => {
    return dispatch => {
        dispatch(report(userId))
    }
}