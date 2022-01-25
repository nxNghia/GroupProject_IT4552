import React, { useEffect, useState, useRef } from 'react'
import './style.css'

const Message = ({messages, to, newMessages, user}) => {
    const msgEnding = useRef(null)
    const getMsg = () => messages.find(friend => friend.friendId === to).messages || []
    // const [firstLoad, setFirstLoad] = useState(true)

    const [_messages, setMessages] = useState(getMsg())

    useEffect(() => {
        setMessages(getMsg())
        // if(!firstLoad)
        // {
        //     msgEnding.current.scrollIntoView({ behavior: 'smooth' })
        //     setFirstLoad(false)
        // }
    }, [newMessages])

    return (
        <div className="message-window">
            {_messages.map((mes, index) => (
                <div className="message-bubble-container" key={index}>
                    <div className={user.id === mes.from ? "message-bubble self" : "message-bubble"}>
                        <p>{mes.content}</p>
                    </div>
                </div>
            ))}
            <div ref={msgEnding} />
        </div>
    )
}

export default Message