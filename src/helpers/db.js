import { db } from '../service/firebase'

export function readChats() {
  let arr = []
  db.ref("chats").on("value", snapshot => {
    snapshot.forEach(snap => {
      arr.push(snap.val())
    })
    return arr
  })
}


export function writeChats(message) {
  return db.ref('chats').push({
    content: message.content,
    timestamp: message.timestamp,
    uid: message.uid
  })
}