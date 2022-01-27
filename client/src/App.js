import { useEffect, useState } from "react";
import Header from './components/Header/';
import Footer from './components/Footer/';
import UserPlaylists from './components/UserPlaylists/';
import MainView from './components/MainView/';
import MainHeader from './components/MainHeader/';
import SideMenu from './components/SideMenu/';
import Friend from './components/Friends/';
import { Search } from './components/Contact/Search';
import './App.css';
import Contact from './components/Contact/';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUser } from './actions/userActions';
import { setToken } from './actions/tokenActions';
import { searchFriend } from "./actions/uiActions";
import { useDispatch } from "react-redux";
import UserDetails from "./components/UserDetails";
import {
  playSong,
  stopSong,
  pauseSong,
  resumeSong,
} from './actions/songActions';

const App = ({
    token,
    fetchUser,
    setToken,
    playSong,
    pauseSong,
    stopSong,
    resumeSong,
    volume,
    blocked,
    searchFriend
}) => {
    let audio
    useEffect(() => {
        let hashParams = {}
        let e
        let r = /([^&;=]+)=?([^&;]*)/g
        let q = window.location.hash.substring(1);

        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2])
        }

        if (!hashParams.access_token)
        {
            window.location.href = 'https://accounts.spotify.com/authorize?client_id=66f97b199c044136aa7dba69e44b4517&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback'
        } else {                   //`https://accounts.spotify.com/authorize?client_id=66f97b199c044136aa7dba69e44b4517&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback
            setToken(hashParams.access_token)
        }
        window.location.hash = ""
    }, [])

    useEffect(() => {
        if(token)
            fetchUser(token)

        if (audio !== undefined)
            audio.volume = volume / 100
    }, [token])

    const stopSongHandle = () => {
        if (audio)
        {
            stopSong();
            audio.pause();
        }
    }

    const pauseSongHandle = () => {
        if (audio)
        {
            pauseSong();
            audio.pause();
        }
    }

    const resumeSongHandle = () => {
        if (audio)
        {
            resumeSong();
            audio.play();
        }
    }
    const [art,setArt] = useState("")
    const audioControl = (song) => {
        console.log(song.track.album.images[0].url)
      
        if (audio === undefined)
        {
            playSong(song.track)
            // setArt(song.track.album.images[0].url)
            audio = new Audio(song.track.preview_url)
            audio.play()
        }else{
            stopSongHandle()
            audio.pause()
            playSong(song.track)
            // setArt(song.track.album.images[0].url)
            audio = new Audio(song.track.preview_url)
            audio.play()
        }
    }

    return (
        <div className="App">
            <div className="app-container">
                <UserDetails />
                <div className="left-side-section">
                    <SideMenu />
                    <UserPlaylists />
                    <Friend />
                </div>

                <div className="main-section">
                    <Header />

                    <div className="main-section-container">
                        {!blocked && <MainHeader
                            pauseSong={pauseSongHandle}
                            resumeSong={resumeSongHandle}
                        />}{' '}

                        {!blocked ? <MainView
                            pauseSong={pauseSongHandle}
                            resumeSong={resumeSongHandle}
                            audioControl={audioControl}
                        /> : <h1 className="block-message">You have been blocked</h1>}
                    </div>
                </div>
            
                <div className="right-side-section">
                    <Search searchHandle={searchFriend}/>
                    <Contact />
                </div>

                <Footer
                    stopSong={stopSongHandle}
                    pauseSong={pauseSongHandle}
                    resumeSong={resumeSongHandle}
                    audioControl={audioControl}
                />
            </div>
        </div>
    )
}

App.propTypes = {
    token: PropTypes.string,
    fetchUser: PropTypes.func,
    setToken: PropTypes.func,
    pauseSong: PropTypes.func,
    playSong: PropTypes.func,
    stopSong: PropTypes.func,
    resumeSong: PropTypes.func,
    volume: PropTypes.number,
}

const mapStateToProps = (state) => {
    return {
        token: state.tokenReducer.token,
        volume: state.soundReducer.volume,
        blocked: state.userReducer.blocked
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            fetchUser,
            setToken,
            playSong,
            stopSong,
            pauseSong,
            resumeSong,
            searchFriend
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)