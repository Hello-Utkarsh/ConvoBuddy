import { WebSocket } from "ws";
import { createRoom, onAnswer, onIceCandidates, onOffer } from "./RoomManager";

const ws = new WebSocket("ws://localhost:8080");

let GLOBAL_ROOM_ID = 0;

export interface User {
  socket: WebSocket;
  id: string;
  name: string;
  prefrence: string[];
  languages: string[];
}
const users: User[] = [];
const queue: string[] = [];

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
    console.log("user exist in users");
    return;
  }
  users.push({ name, socket, prefrence, id, languages });
  if (queue.find((x) => id == x)) {
    console.log("user exist in queue");
    return;
  }
  queue.push(id);
  clearQueue();
  initHandler(id);
};

export const removeUser = async (id: string) => {
  const user = users.find((x) => id === x.id);
  users.filter((x) => x.id !== user?.id);
  queue.filter((x) => x !== user?.id);
};

const clearQueue = () => {
  if (queue.length < 2) {
    console.log("not enough people");
    return;
  }
  const id1 = queue.pop();
  const id2 = queue.pop();
  const user1 = users.find((x) => id1 === x.id);
  const user2 = users.find((x) => id2 === x.id);
  if (!user1 || !user2) {
    return;
  }
  console.log("creating room");
  const room = createRoom(user1, user2);
  clearQueue();
};

export const initHandler = (message: any) => {
  console.log("inside init");
  console.log(message.type);
  if (message.type == "offer") {
    console.log("inside offer")
    onOffer(message.roomId, message.id, message.sdp);
  }
  if (message.type == "answer") {
    console.log("inside answer")
    onAnswer(message.roomId, message.sdp, message.id);
  }
  if (message.type == "add-ice-candidate") {
    console.log("inside add-ice candidate")
    onIceCandidates(message.roomId, message.id, message.candidate, message.userType);
  }
};
