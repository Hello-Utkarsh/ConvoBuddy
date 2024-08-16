import { WebSocket } from "ws";
import { createRoom, onAnswer, onIceCandidates, onOffer } from "./RoomManager";

const port = parseInt(process.env.WS_PORT|| '')
const ws = new WebSocket(`ws://localhost:${port}`);

let GLOBAL_ROOM_ID = 0;

export interface User {
  socket: WebSocket;
  id: string;
  name: string;
  prefrence: string[];
  languages: string[];
}
const users: User[] = [];
let queue: {id: string, prefrence: string[]}[] = [];

export function generateRoomId() {
  return GLOBAL_ROOM_ID++;
}

export const addUser = async (
  name: string,
  socket: WebSocket,
  prefrence: string[],
  id: string,
  languages: string[]
) => {
  if (users.find((x) => id == x.id)) {
    return;
  }
  users.push({ name, socket, prefrence, id, languages });
  if (queue.find((x) => id == x.id)) {
    return;
  }
  queue.push({id, prefrence});
  clearQueue();
  initHandler(id);
};

export const removeUser = async (id: string) => {
  const user = users.find((x) => id === x.id);
  users.filter((x) => x.id !== user?.id);
  queue.filter((x) => x.id !== user?.id);
};

const clearQueue = async() => {
  if (queue.length < 2) {
    return;
  }
  await new Promise(resolve => setTimeout(resolve, 5000))
  let sim = 0
  let id2: any
  const id1 = queue.pop();
  queue.forEach((user) => {
    let x = 0
    id1?.prefrence.forEach(pref => {
      user.prefrence.forEach(userpref => {
        if (pref == userpref) {
          x++
        }
      })
      if (sim < x) {
        id2 = user
      }
    })
  })
  queue = queue.filter(x => x.id != id2.id)
  const user1 = users.find((x) => id1?.id === x.id);
  const user2 = users.find((x) => id2?.id === x.id);
  if (!user1 || !user2) {
    return;
  }
  const room = createRoom(user1, user2);
  clearQueue();
};

export const initHandler = (message: any) => {
  if (message.type == "offer") {
    onOffer(message.roomId, message.id, message.sdp);
  }
  if (message.type == "answer") {
    onAnswer(message.roomId, message.sdp, message.id);
  }
  if (message.type == "add-ice-candidate") {
    onIceCandidates(message.roomId, message.id, message.candidate, message.userType);
  }
};
