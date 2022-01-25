import io from 'socket.io-client'
import { addContact } from '../actions/friendActions'

export const socket = io.connect('/')

const getUser = (state) => {
    return {
        user: state.userReducer.user
    }
}

socket.on('a-follow-was-created', data => {
    console.log(data)
})

socket.on('online', data => {
    // console.log()
})

socket.on('offline', data => {
    // console.log()
})

