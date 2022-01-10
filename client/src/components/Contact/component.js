import React, { useEffect } from 'react'
import ContactItem from './ContactItem'
import io from 'socket.io-client'

const socket = io.connect('/')

const Contact = ({currentConnecting, setCurrentConnecting, friendsList = [], userImg, sendMessage, user, readMessage}) => {

    const submitHandle = (msg, receiver) => {
        sendMessage(socket, {content: msg, receiver: receiver, sender: user.id})
    }
    
    return (
        <div className='message-container'>
            {friendsList.map((friend) => (
                <ContactItem
                    key={friend.id}
                    className={(currentConnecting && currentConnecting.id === friend.id) ? "contact-item-active" : "contact-item"}
                    data={{...friend, expand: currentConnecting ? currentConnecting.id === friend.id : false}}
                    connectHandle={setCurrentConnecting}
                    socket={socket}
                    userImg={userImg}
                    submitHandle={submitHandle}
                    readMessageHandle={readMessage}
                />
            ))}
        </div>
    )
}

export default Contact