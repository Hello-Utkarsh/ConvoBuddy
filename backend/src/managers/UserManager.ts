import { WebSocket } from "ws"

let GLOBAL_ROOM_ID = 0
export interface User{
    socket: any,
    name: string,
    prefrence: string[]
}
const users: User[] = []
const queue: string[] = []

export function generateRoomId(){
    return GLOBAL_ROOM_ID++
}

const addUser = async(name: string, socket: any, prefrence: string[])=>{
    users.push({name, socket, prefrence})
    queue.push(socket.id)
}

const removeUser = async(socketId: string) => {
    const user = users.find(x => socketId === x.socket.id)
    users.filter(x => x.socket.id !== user?.socket.id)
    queue.filter(x => x !== user?.socket.id)
}

const clearQueue = async () => {
    if (queue.length < 2) {
        return
    }
    const id1 = queue.pop()
    const id2 = queue.pop()
    const user1 = users.find(x => id1 === x.socket.id)
    const user2 = users.find(x => id1 === x.socket.id)

}