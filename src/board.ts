import Konva from 'konva'

const LIGHT_SQUARE = '#f0d9b5'
const DARK_SQUARE = '#b58863'

export function drawBoard(layer: Konva.Layer, boardSize = 800) {
  const squareSize = boardSize / 8

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = new Konva.Rect({
        x: col * squareSize,
        y: row * squareSize,
        width: squareSize,
        height: squareSize,
        fill: (row + col) % 2 === 0 ? LIGHT_SQUARE : DARK_SQUARE,
      })
      layer.add(square)
    }
  }
}
