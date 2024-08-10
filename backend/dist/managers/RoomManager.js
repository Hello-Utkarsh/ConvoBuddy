"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onIceCandidates = exports.onAnswer = exports.onOffer = exports.createRoom = void 0;
const UserManager_1 = require("./UserManager");
const rooms = new Map();
const createRoom = (user1, user2) => {
    const roomId = (0, UserManager_1.generateRoomId)().toString();
    rooms.set(roomId, { user1, user2 });
    user1.socket.send(JSON.stringify({ type: "send-offer", roomId }));
    user2.socket.send(JSON.stringify({ type: "send-offer", roomId }));
};
exports.createRoom = createRoom;
const onOffer = (roomId, senderSocketId, sdp) => {
    const room = rooms.get(roomId);
    if (!room) {
        return;
    }
    const recevingUser = room.user1.id === senderSocketId ? room.user2 : room.user1;
    console.log(sdp, "sdp");
    recevingUser.socket.send(JSON.stringify({ type: "offer", sdp, roomId, id: room.user1.id }));
    console.log(recevingUser.id, "receive id");
};
exports.onOffer = onOffer;
const onAnswer = (roomId, sdp, senderSocketId) => {
    const room = rooms.get(roomId);
    if (!room) {
        return;
    }
    console.log(sdp, "roomManager sdp inside onAnswer");
    const recevingUser = room.user1.id === senderSocketId ? room.user1 : room.user2;
    recevingUser.socket.send(JSON.stringify({ type: "answer", sdp, roomId }));
    console.log(recevingUser.id, "sending id");
};
exports.onAnswer = onAnswer;
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
const onIceCandidates = (roomId, senderSocketid, candidate, userType) => {
    const room = rooms.get(roomId);
    console.log(roomId, senderSocketid, candidate, userType);
    if (!room) {
        console.log("out of ice candidate");
        return;
    }
    console.log(senderSocketid, "socketid in onicecandidate");
    const receivingUser = room.user1.id === senderSocketid ? room.user2 : room.user1;
    receivingUser.socket.send(JSON.stringify({ type: "add-ice-candidate", candidate, userType }));
};
exports.onIceCandidates = onIceCandidates;
