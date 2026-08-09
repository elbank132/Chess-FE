import { io, Socket } from 'socket.io-client'
import type { ClientToServerEvents, ServerToClientEvents } from '../types/socketEvents'

const { VITE_SOCKET_URL, VITE_SOCKET_PORT } = import.meta.env
const socketUrl = VITE_SOCKET_PORT ? `${VITE_SOCKET_URL}:${VITE_SOCKET_PORT}` : VITE_SOCKET_URL

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl, {
  autoConnect: true,
})
