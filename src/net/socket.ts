import { io, Socket } from 'socket.io-client'

const { VITE_SOCKET_URL, VITE_SOCKET_PORT } = import.meta.env
const socketUrl = VITE_SOCKET_PORT ? `${VITE_SOCKET_URL}:${VITE_SOCKET_PORT}` : VITE_SOCKET_URL

export const socket: Socket = io(socketUrl, {
  autoConnect: true,
})

socket.on('connect', () => console.log('[socket] connected', socket.id))
socket.on('disconnect', (reason) => console.log('[socket] disconnected', reason))
socket.on('connect_error', (err) => console.error('[socket] connect_error', err))
