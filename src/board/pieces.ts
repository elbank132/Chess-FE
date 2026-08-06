import Konva from 'konva'
import type { PieceSymbol, Color } from 'chess.js'
import { squareToPixel } from './coords'
import { pieceImageUrl, loadPieceImage } from './pieceAssets'

type Board = ({ type: PieceSymbol; color: Color } | null)[][]

export async function renderPieces(layer: Konva.Layer, board: Board, squareSize: number) {
  layer.destroyChildren()

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col]
      if (!piece) continue

      const image = await loadPieceImage(pieceImageUrl(piece))
      const { x, y } = squareToPixel(row, col, squareSize)

      const node = new Konva.Image({
        image,
        x,
        y,
        width: squareSize,
        height: squareSize,
      })
      node.setAttr('square', { row, col })

      layer.add(node)
    }
  }

  layer.draw()
}
