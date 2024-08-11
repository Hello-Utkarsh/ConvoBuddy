import { generateRoomId, User } from "./UserManager";

interface Room {
  user1: User;
  user2: User;
}

const rooms = new Map<string, Room>();
export const createRoom = (user1: User, user2: User) => {
  const roomId = generateRoomId().toString();
  rooms.set(roomId, { user1, user2 });

  user1.socket.send(JSON.stringify({ type: "send-offer", roomId, id:user1.id }));
  user2.socket.send(JSON.stringify({ type: "send-offer", roomId, id: user2.id }));
};

export const onOffer = (
  roomId: string,
  senderSocketId: string,
  sdp: string
) => {
  const room = rooms.get(roomId);
  if (!room) {
    return;
  }

  const recevingUser =
  room.user1.id === senderSocketId ? room.user2 : room.user1;
  recevingUser.socket.send(
    JSON.stringify({ type: "offer", sdp, roomId, id: recevingUser.id })
  );
};

export const onAnswer = (
  roomId: string,
  sdp: string,
  senderSocketId: string
) => {
  const room = rooms.get(roomId);
  if (!room) {
    return;
  }

  const recevingUser =
    room.user1.id === senderSocketId ? room.user2 : room.user1;
  recevingUser.socket.send(JSON.stringify({ type: "answer", sdp, roomId }));
};

export const onIceCandidates = (
  roomId: string,
  senderSocketid: string,
  candidate: any,
  userType: "sender" | "receiver",
) => {
  const room = rooms.get(roomId);
  if (!room) {
    return;
  }

  const receivingUser =
    room.user1.id === senderSocketid ? room.user2 : room.user1;
  receivingUser.socket.send(
    JSON.stringify({ type: "add-ice-candidate", candidate, userType, id:receivingUser.id })
  );
};
