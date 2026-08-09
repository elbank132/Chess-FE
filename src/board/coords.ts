export interface Coord {
  row: number
  col: number
}

export type Orientation = 'w' | 'b'

function orient(row: number, col: number, orientation: Orientation): Coord {
  return orientation === 'b' ? { row: 7 - row, col: 7 - col } : { row, col }
}

export function squareToPixel(row: number, col: number, squareSize: number, orientation: Orientation = 'w') {
  const display = orient(row, col, orientation)
  return { x: display.col * squareSize, y: display.row * squareSize }
}

export function pixelToSquare(x: number, y: number, squareSize: number, orientation: Orientation = 'w'): Coord {
  const display = { row: Math.floor(y / squareSize), col: Math.floor(x / squareSize) }
  return orient(display.row, display.col, orientation)
}

export function squareToAlgebraic(row: number, col: number): string {
  const file = String.fromCharCode('a'.charCodeAt(0) + col)
  const rank = 8 - row
  return `${file}${rank}`
}
