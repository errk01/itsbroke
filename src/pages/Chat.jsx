import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { auth } from '../service/firebase'
import { db } from '../service/firebase'


const Chat = () => {
  const [user, /* setUser */] = useState(auth().currentUser)
  const [chats, setChats] = useState([])
  const [content, setContent] = useState('')
  const [readError, setReadError] = useState(null)
  const [writeError, setWriteError] = useState(null)

  useEffect(() => {
    setReadError(readError)
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val())
        })
        setChats(chats)
      })
    } catch (readError) {
      setReadError(readError.message)
    }
  }, [])

  const handleChange = (event) => {
    setContent(event.target.value)
    console.log('chat', content);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setWriteError(writeError)
    try {
      db.ref('chats').push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid
      })
      setContent(content)
    } catch (writeError) {
      setWriteError(writeError.message)
    }
  }

  return (
    <>
      <div>
        {/* <Header /> */}
        <div className="chats">
          {chats.map((chat) => <p key={chat.timestamp}>{chat.content}</p>)}
        </div>

        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={content} />
          {writeError ? <p>{writeError}</p> : null}
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  )
}

export default Chat
