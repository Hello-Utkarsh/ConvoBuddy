"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const UserManager_1 = require("./managers/UserManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let receiverSocket = null;
wss.on("connection", function connection(ws) {
    ws.on("error", console.error);
    let data;
    ws.on("message", function message(data) {
        const message = JSON.parse(data);
        data = message;
        console.log(message.type, "hello");
        if (message.type == "add-user") {
            (0, UserManager_1.addUser)(message.formData.name, ws, message.formData.interests, message.formData.userid, message.formData.languages);
        }
        if (message.type == 'offer' || message.type == 'answer' || message.type == 'add-ice-candidate') {
            console.log("object");
            (0, UserManager_1.initHandler)(data);
        }
    });
    ws.on("close", (data) => {
        const message = JSON.parse(data);
        (0, UserManager_1.removeUser)(message.id);
    });
});
