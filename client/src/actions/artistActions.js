import { constances as ACTIONS } from '../constances/'

export const fetchArtistsPending = () => {
    return {
        type: ACTIONS.FETCH_ARTISTS_PENDING
    }
}

export const fetchArtistSuccess = (artists) => {
    return {
        type: ACTIONS.FETCH_ARTISTS_SUCCESS,
        artists
    }
}

export const fetchArtistsError = () => {
    return {
        type: ACTIONS.FETCH_ARTISTS_ERROR
    }
}

export const fetchArtists = (accessToken, artistIds) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })

        dispatch(fetchArtistsPending())

        fetch(request)
        .then(res => res.json())
        .then(res => dispatch(fetchArtistSuccess(res)))
        .catch(err => fetchArtistsError(err))
    }
}

export const fetchArtistSongsPending = () => {
    return {
        type: ACTIONS.FETCH_ARTIST_SONGS_PENDING
    }
}

export const fetchArtistSongsSuccess = (songs) => {
    return {
        type: ACTIONS.FETCH_ARTIST_SONGS_SUCCESS,
        songs
    }
}

export const fetchArtistSongsError = () => {
    return {
        type: ACTIONS.FETCH_ARTIST_SONGS_ERROR
    }
}

export const fetchArtistsSongs = (accessToken, artistIds) => {
    return dispatch => {
        const request = new Request(`https://api.spotify.com/v1/artists?ids=${artistIds}/top-tracks?country=US`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + accessToken
            })
        })

        dispatch(fetchArtistSongsPending())

        fetch(request)
        .then(res => {
            if (res.statusText === 'Unauthorized')
                window.location.href = './'

            return res.json()
        })
        .then(res => {
            res.items = res.tracks.map(item => ({ track: item }))

            dispatch(fetchArtistSongsSuccess(res))
        })
        .catch(err => fetchArtistSongsError(err))
    }
}

export const setArtistIds = (artistIds) => {
    return {
        type: ACTIONS.SET_ARTIST_IDS,
        artistIds
    }
}