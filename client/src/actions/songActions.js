import { constances as ACTIONS } from '../constances/'
import axios from 'axios'

import uniqBy from 'lodash/uniqBy';
import { setArtistIds } from './artistActions';

export const fetchSongsPending = () => {
    return {
        type: ACTIONS.FETCH_SONGS_PENDING
    };
};

export const fetchSongsSuccess = (songs) => {
    return {
        type: ACTIONS.FETCH_SONGS_SUCCESS,
        songs
    };
};

export const fetchSongsError = () => {
    return {
        type: ACTIONS.FETCH_SONGS_ERROR
    };
};

export const fetchSongs = (accessToken, userId = '') => {

    //fetch liked songs from user.likedSong instead of fetching
    // directly from spotify api
    return dispatch => {
        const request = new Request(`http://localhost:8000/user/song/liked/${userId}`)

        fetch(request).then(res => {
            return res.json()
        }).then(res => {
            const songs = []

            res.songs.forEach(song => {
                const new_promise = new Promise((resolve, reject) => {
                    const request = new Request(`https://api.spotify.com/v1/tracks?ids=${song.track.id}`, {
                        headers: new Headers({
                            'Authorization': 'Bearer ' + accessToken,
                            'Accept': 'application/json'
                        })
                    })

                    fetch(request).then(res => {
                        if(res.statusText === 'Unauthorized') {
                            window.location.href = './';
                        }
                        return res.json();
                    }).then(res => {
                        res.items = res.tracks.map(track => {
                            return { track: {...track, added_at: song.added_at} }
                        });

                        resolve(res.items)
                    }).catch(err => {
                        reject(err)
                    })
                })

                songs.push(new_promise)
            });

            Promise.all(songs).then(res2 => {
                const liked_songs = res2.reduce((currentItem, nextItem) => [...currentItem, ...nextItem], [])
                dispatch(fetchSongsSuccess(liked_songs))
                // dispatch(fetchSongsSuccess([]))
            })

        })
    }

    


//   return dispatch => {
//     const request = new Request(`https://api.spotify.com/v1/me/tracks?limit=50`, {
//       headers: new Headers({
//         'Authorization': 'Bearer ' + accessToken
//       })
//     });

//     dispatch(fetchSongsPending());

//     fetch(request).then(res => {
//       if(res.statusText === "Unauthorized") {
//         window.location.href = './';
//       }
//       return res.json();
//     }).then(res => {
//       // get all artist ids and remove duplicates
//       let artistIds = uniqBy(res.items, (item) => {
//         return item.track.artists[0].name;
//       }).map(item => {
//         return item.track.artists[0].id;
//       }).join(',');

//       dispatch(setArtistIds(artistIds));

//       dispatch(fetchSongsSuccess(res.items));
//     }).catch(err => {
//       dispatch(fetchSongsError(err));
//     });
//   };
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

export const removeSongFromLibrary = (song, userId) => {
    return dispatch => {
        axios.post(`http://localhost:8000/track/remove`, {
            userId: userId,
            song: song
        }).then(response => {
            dispatch({
                type: ACTIONS.REMOVE_SONG_FROM_LIBRARY,
                song: song
            })
        })
    }
}

export const addSongToLibrary = (accessToken, song, userId) => {
    return dispatch => {
        
        // add id into songsReducer then save into db user.likedSong
        axios.post(`http://localhost:8000/track/liked`, {
            userId: userId,
            song: song
        }).then(response => {
            dispatch({
                type: ACTIONS.ADD_SONG_TO_LIBRARY_SUCCESS,
                song: song,
                status: response.data.message
            })
        })

        // dispatch(addSongToLibrarySuccess(song));
        // console.log(userId)
        // const request = new Request(`http://localhost:8000/track/liked`, {
        //     method: 'POST',
        //     body: {
        //         userId: userId,
        //         songId: song.track.id
        //     }
        // })

        // fetch(request)
        // .then(response => {
        //     console.log(response)
        // })

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

export const searchSongsPending = () => {
    return {
        type: ACTIONS.SEARCH_SONGS_PENDING
    };
};

export const searchSongsSuccess = (songs) => {
    return {
        type: ACTIONS.SEARCH_SONGS_SUCCESS,
        songs
    };
};

export const searchSongsError = () => {
    return {
        type: ACTIONS.SEARCH_SONGS_ERROR
    };
};

export const searchSong = (searchId, accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/tracks?ids=${searchId}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json'
            })
        })

        dispatch(searchSongsPending());

        fetch(request).then(res => {
            if(res.statusText === 'Unauthorized') {
                window.location.href = './';
            }
            return res.json();
        }).then(res => {
            res.items = res.tracks.map(track => {
                return { track: track }
            });

            dispatch(searchSongsSuccess(res.items))
        }).catch(err => {
            dispatch(fetchSongsError(err));
        })
    }
}

export const searchSongs = (searchTerm, accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken,
                'Accept': 'application/json'
            })
        });

        dispatch(searchSongsPending());

        fetch(request)
            .then(res => {
                if(res.statusText === "Unauthorized") {
                    window.location.href = './';
                }

                return res.json();
            }).then(res => {
                res.items = res.tracks.items.map(item => {
                    return {
                        track: item
                    };
                });

                dispatch(searchSongsSuccess(res.items));
            }).catch(err => {
                dispatch(fetchSongsError(err));
            });
    };
};

export const fetchRecentlyPlayedPending = () => {
    return {
        type: ACTIONS.FETCH_RECENTLY_PLAYED_PENDING
    };
};

export const fetchRecentlyPlayedSuccess = (songs) => {
    return {
        type: ACTIONS.FETCH_RECENTLY_PLAYED_SUCCESS,
        songs
    };
};

export const fetchRecentlyPlayedError = () => {
    return {
        type: ACTIONS.FETCH_RECENTLY_PLAYED_ERROR
    };
};

export const fetchRecentlyPlayed = (accessToken) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/me/player/recently-played`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        });

        dispatch(fetchRecentlyPlayedPending());

        fetch(request)
            .then(res => {
                return res.json();
            }).then(res => {
                //remove duplicates from recently played
                res.items = uniqBy(res.items, (item) => {
                return item.track.id;
                });

                dispatch(fetchRecentlyPlayedSuccess(res.items));
            }).catch(err => {
                dispatch(fetchRecentlyPlayedError(err));
            });
        };
};

export const playSong = (song) => {
    return {
        type: ACTIONS.PLAY_SONG,
        song
  };
};

export const stopSong = () => {
    return {
        type: ACTIONS.STOP_SONG
    };
};

export const pauseSong = () => {
    return {
        type: ACTIONS.PAUSE_SONG
    };
};

export const resumeSong = () => {
    return {
        type: ACTIONS.RESUME_SONG
    };
};

export const increaseSongTime = (time) => {
    return {
        type: ACTIONS.INCREASE_SONG_TIME,
        time
    };
};

export const updateViewType = (view) => {
    return {
        type: ACTIONS.UPDATE_VIEW_TYPE,
        view
    };
};
