import type { Color } from 'chess.js'
import { socket } from './socket'
import { saveGameId } from './gameStorage'
import { GameManager } from '../game/GameManager'
import { Status } from '../types/socketEvents'

export function registerGameEvents(game: GameManager, onStateChange: () => void) {
  socket.on('match_found', (data) => {
    const color: Color = socket.id === data.whitePlayerId ? 'w' : 'b'
    game.loadFen(data.fen)
    game.setColor(color)
    game.setGameId(data.gameId)
    game.setStatus(Status.ACTIVE)
    saveGameId(data.gameId)
    onStateChange()
  })

  socket.on('game_state_update', (data) => {
    game.loadFen(data.fen)
    game.setStatus(data.status)
    onStateChange()
  })
}
