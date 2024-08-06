import { generateRoomId, User } from "./UserManager"

interface Room{
    user1: User
    user2: User
}

const room = new Map<string, Room>()
const createRoom = (user1: User, user2: User) => {
    const roomId = generateRoomId().toString()
    room.set(roomId, {user1, user2})

    user1.socket
}