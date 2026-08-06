import { Chess, type Move, type Square } from 'chess.js'

export class GameManager {
  private chess = new Chess()

  getBoard() {
    return this.chess.board()
  }

  getTurn() {
    return this.chess.turn()
  }

  isGameOver() {
    return this.chess.isGameOver()
  }

  move(from: string, to: string, promotion = 'q'): Move | null {
    try {
      return this.chess.move({ from: from as Square, to: to as Square, promotion })
    } catch {
      return null
    }
  }
}
