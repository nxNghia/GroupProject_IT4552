import React, { useEffect, useRef, useState } from 'react'
import Message from '../Message'
import InputField from '../Message/InputField'
import './style.css'
import { Badge } from '@material-ui/core'

const ClickOutSideHandle = (ref, connectHandle, data) => {
    useEffect(() => {
        const clickOutSideHandle = e => {
            if (ref.current && !ref.current.contains(e.target))
            {
                connectHandle(data, false)
            }
            else
            {
                connectHandle(data , true)
            }
        }

        document.addEventListener("mousedown", clickOutSideHandle)
        return () => document.removeEventListener("mousedown", clickOutSideHandle)
    }, [ref])
}

const ContactItem = ({data, connectHandle, className, submitHandle, readMessageHandle, newMessages = [], currentConnecting}) => {
    const mesRef = useRef(null)

    ClickOutSideHandle(mesRef, connectHandle, data)

    const _submitHandle = (msg) => {
        submitHandle(msg, data.room)
    }

    const readNewMessageHandle = () => {
        if(data.newMessage)
            readMessageHandle(data.id)
    }

    const [hasNewMsg, setHasNewMsg] = useState(false)

    useEffect(() => {
        if (newMessages.includes(data.friendId))
            setHasNewMsg(true)
        else
            setHasNewMsg(false)
    }, [newMessages])

    return (
        <div ref={mesRef} className={className} onClick={readNewMessageHandle}>
            <div className="friend-details-container">
                <Badge color="secondary" variant='dot' invisible={!hasNewMsg}>
                    <img className="friend-image" alt="user" src={data.image} />
                    {/* <img className="friend-image" alt="user" src="https://i.pravatar.cc/100" /> */}
                </Badge>
                {data.name}
            </div>
            <Message to={data.friendId}/>
            {data.expand && <InputField submitHandle={_submitHandle}/>}
        </div>
    )
}

export default ContactItem