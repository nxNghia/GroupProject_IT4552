import { constances as ACTIONS } from "../constances"

const defaultState = {
    messages: [
        {
            to: "1",
            data: [
                {
                    id: "1",
                    self: true,
                    content: "hello"
                },
                {
                    id: "2",
                    self: false,
                    content: "hello too, so what is your name"
                },
                {
                    id: "3",
                    self: false,
                    content: "hello too, so what is your name"
                },
                {
                    id: "4",
                    self: false,
                    content: "hello too, so what is your name"
                },
                {
                    id: "5",
                    self: false,
                    content: "hello too, so what is your name"
                },
                {
                    id: "6",
                    self: false,
                    content: "hello too, so what is your name"
                }
            ]
        }
    ]
}

export const messageReducer = (state = defaultState, action) => {
    switch (action.type)
    {
            
        case ACTIONS.SENT_MESSAGE:
            {
                const new_msg = action.message

                const temp = [...state.messages]

                const receiver = temp.find(msg => msg.to === new_msg.receiver)
                if(receiver)
                    receiver.data.push({id: receiver.data.length + 1 + '', self: true, content: new_msg.content})

                return {
                    ...state,
                    messages: [...temp]
                }
            }

        default: return state
    }
}

export default messageReducer