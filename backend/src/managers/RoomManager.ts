import { generateRoomId, User } from "./UserManager";

interface Room {
  user1: User;
  user2: User;
}

const rooms = new Map<string, Room>();
export const createRoom = (user1: User, user2: User) => {
  const roomId = generateRoomId().toString();
  rooms.set(roomId, { user1, user2 });

  user1.socket.send(JSON.stringify({ type: "send-offer", roomId }));
  user2.socket.send(JSON.stringify({ type: "send-offer", roomId }));
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
  console.log(sdp, "sdp");
  recevingUser.socket.send(
    JSON.stringify({ type: "offer", sdp, roomId, id: room.user1.id })
  );
  console.log(recevingUser.id, "receive id");
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

  console.log(sdp, "roomManager sdp inside onAnswer")

  const recevingUser =
    room.user1.id === senderSocketId ? room.user1 : room.user2;
  recevingUser.socket.send(JSON.stringify({ type: "answer", sdp, roomId }));
  console.log(recevingUser.id, "sending id");
};

// export const iceCandidate = (
//   roomId: string,
//   senderSocketid: string,
//   candidate: any,
//   userType: "sender" | "receiver"
// ) => {
//   const room = rooms.get(roomId);
//   if (!room) {
//     return;
//   }
//   const receivingUser =
//     room.user1.id === senderSocketid ? room.user2 : room.user1;
//   receivingUser.socket.send(
//     JSON.stringify({ type: "add-ice-candidate", candidate, userType })
//   );
// };

export const onIceCandidates = (
  roomId: string,
  senderSocketid: string,
  candidate: any,
  userType: "sender" | "receiver"
) => {
  const room = rooms.get(roomId);
  console.log(roomId, senderSocketid, candidate, userType)
  if (!room) {
    console.log("out of ice candidate")
    return;
  }

  const receivingUser =
    room.user1.id === senderSocketid ? room.user2 : room.user1;
  receivingUser.socket.send(
    JSON.stringify({ type: "add-ice-candidate", candidate, userType })
  );
};
