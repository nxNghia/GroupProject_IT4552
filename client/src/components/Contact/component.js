import React, { useEffect, useState } from 'react'
import ContactItem from './ContactItem'
import { socket } from '../../socket/socket'

const Contact = ({currentConnecting, setCurrentConnecting, friendsList = [], sendMessage, user, readMessage, addContact, receiveNewMsg, newMessages, friendSearch}) => {

    const submitHandle = (msg, receiver) => {
        sendMessage({content: msg, room: receiver, sender: user.id})
    }

    const [_friendsList, setList] = useState(friendsList)

    useEffect(() => {
        socket.on('a-new-match', data => {
            addContact(data.contact)
        })

        socket.on('new-message', data => {
            console.log(data)
            receiveNewMsg(data)
        })

        return () => {
            socket.off('a-new-match')
        }
    }, [socket])

    useEffect(() => {
        setList(friendsList)
    }, [friendsList])

    useEffect(() => {
        if (friendSearch === '')
        {
            setList(friendsList)
        }else{
            setList(friendsList.filter(friend => friend.name.toLowerCase().includes(friendSearch.toLowerCase())))
        }
    }, [friendSearch])
    
    return (
        <div className='message-container'>
            {_friendsList.map((friend) => (
                <ContactItem
                    key={friend.friendId}
                    className={(currentConnecting && currentConnecting.room === friend.room) ? "contact-item-active" : "contact-item"}
                    data={{...friend, expand: currentConnecting ? currentConnecting.room === friend.room : false}}
                    connectHandle={setCurrentConnecting}
                    newMessages={newMessages}
                    submitHandle={submitHandle}
                    readMessageHandle={readMessage}
                    currentConnecting={currentConnecting}
                />
            ))}
        </div>
    )
}

export default Contact