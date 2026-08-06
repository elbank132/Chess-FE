import './style.css'
import Konva from 'konva'
import { drawBoard } from './board/board'
import { renderPieces } from './board/pieces'
import { attachDragHandlers } from './input/dragHandler'
import { GameManager } from './game/GameManager'

const BOARD_SIZE = 800
const SQUARE_SIZE = BOARD_SIZE / 8

const stage = new Konva.Stage({
  container: 'app',
  width: BOARD_SIZE,
  height: BOARD_SIZE,
})

const boardLayer = new Konva.Layer()
const pieceLayer = new Konva.Layer()
stage.add(boardLayer)
stage.add(pieceLayer)

drawBoard(boardLayer, BOARD_SIZE)
boardLayer.draw()

const game = new GameManager()

async function render() {
  await renderPieces(pieceLayer, game.getBoard(), SQUARE_SIZE)
  attachDragHandlers(pieceLayer, game, SQUARE_SIZE, render)
}

render()
