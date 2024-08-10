"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHandler = exports.removeUser = exports.addUser = exports.generateRoomId = void 0;
const ws_1 = require("ws");
const RoomManager_1 = require("./RoomManager");
const ws = new ws_1.WebSocket("ws://localhost:8080");
let GLOBAL_ROOM_ID = 0;
const users = [];
const queue = [];
function generateRoomId() {
    return GLOBAL_ROOM_ID++;
}
exports.generateRoomId = generateRoomId;
const addUser = (name, socket, prefrence, id, languages) => __awaiter(void 0, void 0, void 0, function* () {
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
    (0, exports.initHandler)(id);
});
exports.addUser = addUser;
const removeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = users.find((x) => id === x.id);
    users.filter((x) => x.id !== (user === null || user === void 0 ? void 0 : user.id));
    queue.filter((x) => x !== (user === null || user === void 0 ? void 0 : user.id));
});
exports.removeUser = removeUser;
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
    const room = (0, RoomManager_1.createRoom)(user1, user2);
    clearQueue();
};
const initHandler = (message) => {
    console.log("inside init");
    console.log(message.type);
    if (message.type == "offer") {
        console.log("inside offer");
        (0, RoomManager_1.onOffer)(message.roomId, message.id, message.sdp);
    }
    if (message.type == "answer") {
        console.log("inside answer");
        (0, RoomManager_1.onAnswer)(message.roomId, message.sdp, message.id);
    }
    if (message.type == "add-ice-candidate") {
        console.log("inside add-ice candidate");
        (0, RoomManager_1.onIceCandidates)(message.roomId, message.id, message.candidate, message.userType);
    }
};
exports.initHandler = initHandler;
