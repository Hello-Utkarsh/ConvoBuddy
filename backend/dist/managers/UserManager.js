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
const port = parseInt(process.env.WS_PORT || '');
const ws = new ws_1.WebSocket(`ws://localhost:${port}`);
let GLOBAL_ROOM_ID = 0;
const users = [];
let queue = [];
function generateRoomId() {
    return GLOBAL_ROOM_ID++;
}
exports.generateRoomId = generateRoomId;
const addUser = (name, socket, prefrence, id, languages) => __awaiter(void 0, void 0, void 0, function* () {
    if (users.find((x) => id == x.id)) {
        return;
    }
    users.push({ name, socket, prefrence, id, languages });
    if (queue.find((x) => id == x.id)) {
        return;
    }
    queue.push({ id, prefrence });
    clearQueue();
    (0, exports.initHandler)(id);
});
exports.addUser = addUser;
const removeUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = users.find((x) => id === x.id);
    users.filter((x) => x.id !== (user === null || user === void 0 ? void 0 : user.id));
    queue.filter((x) => x.id !== (user === null || user === void 0 ? void 0 : user.id));
});
exports.removeUser = removeUser;
const clearQueue = () => __awaiter(void 0, void 0, void 0, function* () {
    if (queue.length < 2) {
        return;
    }
    yield new Promise(resolve => setTimeout(resolve, 5000));
    let sim = 0;
    let id2;
    const id1 = queue.pop();
    queue.forEach((user) => {
        let x = 0;
        id1 === null || id1 === void 0 ? void 0 : id1.prefrence.forEach(pref => {
            user.prefrence.forEach(userpref => {
                if (pref == userpref) {
                    x++;
                }
            });
            if (sim < x) {
                id2 = user;
            }
        });
    });
    queue = queue.filter(x => x.id != id2.id);
    const user1 = users.find((x) => (id1 === null || id1 === void 0 ? void 0 : id1.id) === x.id);
    const user2 = users.find((x) => (id2 === null || id2 === void 0 ? void 0 : id2.id) === x.id);
    if (!user1 || !user2) {
        return;
    }
    const room = (0, RoomManager_1.createRoom)(user1, user2);
    clearQueue();
});
const initHandler = (message) => {
    if (message.type == "offer") {
        (0, RoomManager_1.onOffer)(message.roomId, message.id, message.sdp);
    }
    if (message.type == "answer") {
        (0, RoomManager_1.onAnswer)(message.roomId, message.sdp, message.id);
    }
    if (message.type == "add-ice-candidate") {
        (0, RoomManager_1.onIceCandidates)(message.roomId, message.id, message.candidate, message.userType);
    }
};
exports.initHandler = initHandler;
