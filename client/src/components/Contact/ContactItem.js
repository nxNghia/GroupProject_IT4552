import React, { useEffect, useRef } from 'react'
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

const ContactItem = ({data, connectHandle, socket, className, userImg, submitHandle, readMessageHandle}) => {
    const mesRef = useRef(null)

    ClickOutSideHandle(mesRef, connectHandle, data)

    const _submitHandle = (msg) => {
        submitHandle(msg, data.id)
    }

    const readNewMessageHandle = () => {
        if(data.newMessage)
            readMessageHandle(data.id)
    }

    return (
        <div ref={mesRef} className={className} onClick={readNewMessageHandle}>
            <div className="friend-details-container">
                <Badge color="secondary" variant='dot' invisible={!data.newMessage}>
                    <img className="friend-image" alt="user" src='https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1541753135972237&height=300&width=300&ext=1644084837&hash=AeSC8yDJHOhyCg24QRM' />
                </Badge>
                {data.name}
            </div>
            <Message expand={data.expand} to={data.id}/>
            {data.expand && <InputField submitHandle={_submitHandle}/>}
        </div>
    )
}

export default ContactItem