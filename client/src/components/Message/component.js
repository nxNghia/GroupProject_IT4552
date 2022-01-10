import React, { Component } from 'react'
import InputField from './InputField'
import './style.css'

class Message extends Component {
    constructor(props) {
        super(props)

        this.state = {
            messages: this.props.messages.some(mes => mes.to === this.props.to)
                ? this.props.messages.find(mes => mes.to === this.props.to).data : []
        }
    }

    render() {
        return (
            <div className="message-window">
                {this.state.messages.map(mes => (
                    <div className="message-bubble-container" key={mes.id}>
                        <div key={mes.id} className={mes.self ? "message-bubble self" : "message-bubble"}>
                            <p>{mes.content}</p>
                        </div>
                    </div>
                ))}

                {/* {this.props.expand && <InputField/>} */}
            </div>
        )
    }
}

export default Message