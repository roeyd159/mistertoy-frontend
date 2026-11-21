import { useState } from "react"

export function Chat() {
    const [userText, setUserText] = useState('')
    const [messages, setMessages] = useState([])

    function handleChange({ target }) {
        const { value } = target
        setUserText(value)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        let messagesCopy = [...messages]
        messagesCopy.push(userText)
        setMessages(messagesCopy)
        setUserText('')
        setTimeout(() => {
            getChatRes()
        }, 500)
    }

    function getChatRes() {
        const chatMessage = 'Sure thing honey'
        setMessages(prevMessages => [...prevMessages, chatMessage])

    }


    return (
        <section className="chat-wrap">
            <div className="chat-display">
                {messages.map((message, idx) => {
                    return <div key={idx}>{message}</div>
                })}
            </div>
            <form onSubmit={onSubmit}>
                <input onChange={handleChange} type="text" value={userText} />
                <button>Send</button>
            </form>
        </section>
    )
}