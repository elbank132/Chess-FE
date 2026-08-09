import { Chess, type Color, type Move, type Square } from 'chess.js'
import { Status } from '../types/socketEvents'
import type { Orientation } from '../board/coords'

function normalizeFen(fen: string): string {
  const fields = fen.trim().split(/\s+/)
  return fields.length < 6 ? [...fields, '1'].join(' ') : fen
}

export class GameManager {
  private chess = new Chess()
  private color: Color | null = null
  private gameId: string | null = null
  private status: Status = Status.ACTIVE

  getBoard() {
    return this.chess.board()
  }

  getTurn() {
    return this.chess.turn()
  }

  isGameOver() {
    return this.chess.isGameOver()
  }

  loadFen(fen: string) {
    this.chess.load(normalizeFen(fen), { skipValidation: true })
  }

  setColor(color: Color) {
    this.color = color
  }

  getColor() {
    return this.color
  }

  getOrientation(): Orientation {
    return this.color ?? 'w'
  }

  setGameId(gameId: string) {
    this.gameId = gameId
  }

  getGameId() {
    return this.gameId
  }

  setStatus(status: Status) {
    this.status = status
  }

  getStatus() {
    return this.status
  }

  canMove(): boolean {
    return this.status === Status.ACTIVE && this.color !== null && this.chess.turn() === this.color
  }

  move(from: string, to: string, promotion = 'q'): Move | null {
    if (!this.canMove()) return null
    try {
      return this.chess.move({ from: from as Square, to: to as Square, promotion })
    } catch {
      return null
    }
  }
}
