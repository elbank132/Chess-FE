import { Chess, type Color, type Move, type PieceSymbol, type Square } from 'chess.js'
import { Status } from '../types/socketEvents'
import type { Orientation } from '../board/coords'

function normalizeFen(fen: string): string {
  const fields = fen.trim().split(/\s+/)
  return fields.length < 6 ? [...fields, '1'].join(' ') : fen
}

const SKIP_MOVE_VALIDATION = import.meta.env.VITE_SKIP_MOVE_VALIDATION === 'true'

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
    if (SKIP_MOVE_VALIDATION) {
      return true
    }
    return this.status === Status.ACTIVE && this.color !== null && this.chess.turn() === this.color
  }

  private forceMove(from: string, to: string, promotion: string): Move | null {
    const piece = this.chess.get(from as Square)
    if (!piece) return null

    const isPromotion = piece.type === 'p' && (to[1] === '1' || to[1] === '8')
    const resultType: PieceSymbol = isPromotion ? (promotion as PieceSymbol) : piece.type

    this.chess.remove(from as Square)
    this.chess.remove(to as Square)
    this.chess.put({ type: resultType, color: piece.color }, to as Square)

    const fenFields = this.chess.fen().split(' ')
    fenFields[1] = fenFields[1] === 'w' ? 'b' : 'w'
    this.chess.load(fenFields.join(' '), { skipValidation: true })

    return { from, to, promotion, color: piece.color, piece: piece.type } as unknown as Move
  }

  move(from: string, to: string, promotion = 'q'): Move | null {
    if (!this.canMove()) return null
    if (SKIP_MOVE_VALIDATION) {
      return this.forceMove(from, to, promotion)
    }
    try {
      return this.chess.move({ from: from as Square, to: to as Square, promotion })
    } catch {
      return null
    }
  }
}
