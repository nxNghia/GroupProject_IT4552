import React, { useState } from 'react'
import './style.css'

const InputField = ({submitHandle}) => {
    const [text, setText] = useState('')

    return (
        <div className="input-field">
            <input
                value={text}            
                onChange={e => setText(e.target.value)}
                onKeyUp={e => {
                    if(e.key === 'Enter')
                    {
                        submitHandle(text)
                        setText('')
                    }
                }}
            />
        </div>
    )
}

export default InputField