import { WebSocketServer } from "ws";
import { addUser, initHandler, removeUser } from "./managers/UserManager";

const port = parseInt(process.env.WS_PORT|| '')
const wss = new WebSocketServer({ port: port });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);
  let data: any

  ws.on("message", function message(data: any) {
    const message = JSON.parse(data);
    data = message
    if (message.type == "add-user") {
      addUser(
        message.formData.name,
        ws,
        message.formData.interests,
        message.formData.userid,
        message.formData.languages
      );
    }
    if (message.type == 'offer' || message.type == 'answer' || message.type == 'add-ice-candidate') {
      initHandler(data)
    }
  });

  ws.on("close", (data: any) => {
    const message = JSON.parse(data);
    removeUser(message.id);
  });
});
