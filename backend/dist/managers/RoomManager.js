"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onIceCandidates = exports.onAnswer = exports.onOffer = exports.createRoom = void 0;
const UserManager_1 = require("./UserManager");
const rooms = new Map();
const createRoom = (user1, user2) => {
    const roomId = (0, UserManager_1.generateRoomId)().toString();
    rooms.set(roomId, { user1, user2 });
    user1.socket.send(JSON.stringify({ type: "send-offer", roomId, id: user1.id }));
    user2.socket.send(JSON.stringify({ type: "send-offer", roomId, id: user2.id }));
};
exports.createRoom = createRoom;
const onOffer = (roomId, senderSocketId, sdp) => {
    const room = rooms.get(roomId);
    if (!room) {
        return;
    }
    const recevingUser = room.user1.id === senderSocketId ? room.user2 : room.user1;
    recevingUser.socket.send(JSON.stringify({ type: "offer", sdp, roomId, id: recevingUser.id }));
};
exports.onOffer = onOffer;
const onAnswer = (roomId, sdp, senderSocketId) => {
    const room = rooms.get(roomId);
    if (!room) {
        return;
    }
    const recevingUser = room.user1.id === senderSocketId ? room.user2 : room.user1;
    recevingUser.socket.send(JSON.stringify({ type: "answer", sdp, roomId }));
};
exports.onAnswer = onAnswer;
const onIceCandidates = (roomId, senderSocketid, candidate, userType) => {
    const room = rooms.get(roomId);
    if (!room) {
        return;
    }
    const receivingUser = room.user1.id === senderSocketid ? room.user2 : room.user1;
    receivingUser.socket.send(JSON.stringify({ type: "add-ice-candidate", candidate, userType, id: receivingUser.id }));
};
exports.onIceCandidates = onIceCandidates;
