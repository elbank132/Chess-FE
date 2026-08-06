import Konva from 'konva'
import { GameManager } from '../game/GameManager'
import { pixelToSquare, squareToAlgebraic, squareToPixel, type Coord } from '../board/coords'

export function attachDragHandlers(
  layer: Konva.Layer,
  game: GameManager,
  squareSize: number,
  onMove: () => void,
) {
  layer.children.forEach((node: Konva.Node) => {
    node.draggable(true)
    node.on('dragend', () => {
      const origin = node.getAttr('square') as Coord
      const target = pixelToSquare(node.x() + squareSize / 2, node.y() + squareSize / 2, squareSize)

      const from = squareToAlgebraic(origin.row, origin.col)
      const to = squareToAlgebraic(target.row, target.col)
      const result = game.move(from, to)

      if (!result) {
        const { x, y } = squareToPixel(origin.row, origin.col, squareSize)
        node.position({ x, y })
      } else {
        onMove()
      }
    })
  })
}
