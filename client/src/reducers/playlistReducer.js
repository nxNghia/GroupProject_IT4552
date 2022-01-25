import { constances as ACTIONS } from "../constances";

const defaultState = {
    playlists: [],
    uPlaylists: [],
    followedPlaylist: []
}

export const playlistReducer = (state = defaultState, action) => {
    switch (action.type)
    {
        case ACTIONS.FETCH_PLAYLIST_MENU_PENDING:
            return {
                ...state,
                fetchPlaylistPending: true
            }

        case ACTIONS.FETCH_PLAYLIST_MENU_SUCCESS:
            return {
                ...state,
                playlistMenu: action.playlists,
                playlists: [...state.playlists, ...action.playlists],
                fetchPlaylistError: false,
                fetchPlaylistPending: false
            }

        case ACTIONS.ADD_PLAYLIST_ITEM:
            if (state.playlists.some(playlist => {
                if(playlist.id)
                    return playlist.id === action.playlist.id || playlist.id === action.playlist._id
                else
                    return playlist._id === action.playlist.id || playlist._id === action.playlist._id
            }))
            return state
            else
            return {
                ...state,
                playlists: [
                    ...state.playlists,
                    action.playlist
                ]
            }

        case ACTIONS.FETCH_PLAYLIST_MENU_ERROR:
            return {
                ...state,
                fetchPlaylisrError: true,
                fetchPlaylistPending: false
            }

        case ACTIONS.UPDATE_USER_PLAYLIST:
            if(action.data.message === 'Success')
            {
                const new_playlist = [...state.playlistMenu]
                const changed_playlist = new_playlist.find(playlist => playlist._id === action.data.result._id)

                if(changed_playlist)
                    changed_playlist.name = action.data.result.name

                return {
                    ...state,
                    playlistMenu: [...new_playlist]
                }
            }else{
                return state
            }

        case ACTIONS.CREATE_PLAYLIST:
            return {
                ...state,
                playlistMenu: action.newPlaylist ? [...state.playlistMenu, {...action.newPlaylist}] : [...state.playlistMenu]
            }

        case ACTIONS.ADD_INTO_PLAYLIST:
            const new_playlists = [...state.playlistMenu]
            const selected_playlist = new_playlists.find(playlist => playlist._id === action.data.playlistId)

            if(selected_playlist)
            {
                if(selected_playlist.tracks.songs.some(song => song.id === action.data.song.track.id))
                    return state
                else {
                    selected_playlist.tracks.songs.push(action.data.song)
                    selected_playlist.tracks.total = selected_playlist.tracks.songs.length
                    return {
                        ...state,
                        playlistMenu: new_playlists
                    }
                }
            }else{
                return state
            }

        case ACTIONS.REMOVE_PLAYLIST:
            if (action.data.message === 'Success')
            {
                const new_playlist_menu = state.playlistMenu.filter(playlist => playlist._id !== action.data.id)
                
                return {
                    ...state,
                    playlistMenu: new_playlist_menu
                }
            }else{
                return state
            }

        case ACTIONS.FETCH_UPLAYLIST:
            return {
                ...state,
                uPlaylists: action.uPlaylists
            }

        case ACTIONS.FOLLOW_PLAYLIST_SUCCESS:
            return {
                ...state,
                followedPlaylist: action.playlists
            }

        default: return state
    }
}