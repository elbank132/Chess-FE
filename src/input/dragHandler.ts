import Konva from 'konva'
import { GameManager } from '../game/GameManager'
import { socket } from '../net/socket'
import { pixelToSquare, squareToAlgebraic, squareToPixel, type Coord, type Orientation } from '../board/coords'

export function attachDragHandlers(
  layer: Konva.Layer,
  game: GameManager,
  squareSize: number,
  onMove: () => void,
  orientation: Orientation,
) {
  layer.children.forEach((node: Konva.Node) => {
    node.draggable(game.canMove())
    node.on('dragend', () => {
      const origin = node.getAttr('square') as Coord
      const target = pixelToSquare(node.x() + squareSize / 2, node.y() + squareSize / 2, squareSize, orientation)

      const from = squareToAlgebraic(origin.row, origin.col)
      const to = squareToAlgebraic(target.row, target.col)
      const result = game.move(from, to)

      if (!result) {
        const { x, y } = squareToPixel(origin.row, origin.col, squareSize, orientation)
        node.position({ x, y })
      } else {
        const gameId = game.getGameId()
        if (gameId) {
          socket.emit('move', { move: from + to, gameId })
        }
        onMove()
      }
    })
  })
}
