export interface Coord {
  row: number
  col: number
}

export function squareToPixel(row: number, col: number, squareSize: number) {
  return { x: col * squareSize, y: row * squareSize }
}

export function pixelToSquare(x: number, y: number, squareSize: number): Coord {
  return { row: Math.floor(y / squareSize), col: Math.floor(x / squareSize) }
}

export function squareToAlgebraic(row: number, col: number): string {
  const file = String.fromCharCode('a'.charCodeAt(0) + col)
  const rank = 8 - row
  return `${file}${rank}`
}
