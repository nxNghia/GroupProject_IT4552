import { constances as ACTIONS } from "../constances"

const defaultState = {
    fetchSongsPending: true,
    songPlaying: false,
    timeElapsed: 0,
    songId: 0,
    viewType:'songs',
    songPaused: true,
    likedSongs: []
}

export const songsReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.UPDATE_VIEW_TYPE:
            return {
                ...state,
                viewType: action.view
            }

        case ACTIONS.FETCH_SONGS_PENDING:
            return {
                ...state,
                fetchSongsPending: true
            }

        case ACTIONS.FETCH_SONGS_SUCCESS:
            return {
                ...state,
                likedSongs: action.songs,
                fetchSongsError: false,
                fetchSongsPending: false,
                viewType: 'songs'
            }

        case ACTIONS.ADD_SONG_TO_LIBRARY_SUCCESS:
            if (action.status === 'Success')
            {
                return {
                    ...state,
                    likedSongs: [...state.likedSongs, action.song]
                }
            }else{
                return state
            }

        case ACTIONS.REMOVE_SONG_FROM_LIBRARY:
            const new_songs = state.likedSongs.filter(song => song.track.id !== action.song.track.id)
            return {
                ...state,
                likedSongs: [...new_songs]
            }



        case ACTIONS.FETCH_SONGS_ERROR:
            return {
                ...state,
                fetchSongsError: true,
                fetchSongsPending: false
            }

        case ACTIONS.SEARCH_SONGS_PENDING:
            return {
                ...state,
                searchSongsPending: true
            }

        case ACTIONS.SEARCH_SONGS_SUCCESS:
            return {
                ...state,
                songs: action.songs,
                searchSongsError: false,
                searchSongsPending: false,
                viewType: 'search'
            }

        case ACTIONS.SEARCH_SONGS_ERROR:
            return {
                ...state,
                searchSongsError: true,
                searchSongsPending: false
            }

        case ACTIONS.FETCH_RECENTLY_PLAYED_PENDING:
            return {
                ...state,
                fetchSongsPending: true
            }

        case ACTIONS.FETCH_RECENTLY_PLAYED_SUCCESS:
            return {
                ...state,
                songs: action.songs,
                fetchSongsError: false,
                fetchSongsPending: false,
                viewType: 'songs'
            }

        case ACTIONS.FETCH_RECENTLY_PLAYED_ERROR:
            return {
                ...state,
                fetchSongsError: true,
                fetchSongsPending: false
            }

        case ACTIONS.FETCH_PLAYLIST_SONGS_PENDING:
            return {
                ...state,
                fetchPlaylistSongsPending: true
            }

        case ACTIONS.FETCH_PLAYLIST_SONGS_SUCCESS:
            return {
                ...state,
                songs: action.songs,
                viewType: 'playlist',
                fetchPlaylistSongsError: false,
                fetchPlaySongsPending: false
            }

        case ACTIONS.FETCH_PLAYLIST_SONGS_ERROR:
            return {
                ...state,
                fetchPlaylistSongsError: true,
                fetchPlaylistSongsPending: false
            }

        case ACTIONS.FETCH_ARTIST_SONGS_PENDING:
            return {
                ...state,
                fetchArtistSongsPending: true
            }

        case ACTIONS.FETCH_ARTIST_SONGS_SUCCESS:
            return {
                ...state,
                songs: action.songs,
                viewType: 'Artist',
                fetchArtistSongsError: false,
                fetchArtistSongsPenging: false
            }

        case ACTIONS.FETCH_ARTIST_SONGS_ERROR:
            return {
                ...state,
                fetchArtistSongsError: true,
                fetchArtistSongsPending: false
            }

        case ACTIONS.PLAY_SONG:
            return {
                ...state,
                songPlaying: true,
                songDetails: action.song,
                songId: action.song.id,
                timeElapsed: 0,
                songPaused: false
            }

        case ACTIONS.STOP_SONG:
            return {
                ...state,
                songPlaying: false,
                songDetail: null,
                timeElapsed: 0,
                songPaused: true
            }

        case ACTIONS.PAUSE_SONG:
            return {
                ...state,
                songPaused: true
            }

        case ACTIONS.RESUME_SONG:
            return {
                ...state,
                songPaused: false
            }

        case ACTIONS.INCREASE_SONG_TIME:
            return {
                ...state,
                timeElapsed: action.time
            }

        default: return state
    }
}